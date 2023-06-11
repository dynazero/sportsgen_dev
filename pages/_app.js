import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import '../styles/Modal.css'
import Modal from '../components/Modal/index.jsx'
import { AnimatePresence } from 'framer-motion'





function MyApp({ Component, pageProps: { session, ...pageProps } }){

  const [modalOpen, setModalOpen] = useState(false);
  const [panelSide, setPanelSide] = useState(true);
  const [verified, setVerified] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  


  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");

    if (pageProps.teamItem?.[0]?._id) {
      setVerified(true);
    }

  }, [pageProps.teamItem]);

  

  const modalClick = (event, modal, panel ) => {
    // console.log(bool);
    setModalOpen(modal);
    
    setPanelSide(panel)
    // console.log('_app panel'+ panel);
  };
  

  return (
    <>
      
      <SessionProvider  session={session}>
      <Menu modalClick={modalClick} modalOpen={modalOpen} panelSide={panelSide} verified={verified}/>
      <Component {...pageProps} />

      <AnimatePresence
        initial={false}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} panelSide={panelSide}/>}
      </AnimatePresence>
      </SessionProvider>

    </>
  )
}

export default MyApp
