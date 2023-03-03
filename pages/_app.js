import { Provider } from "next-auth/client"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import '../styles/Modal.css'
import Modal from '../components/Modal/index.jsx'
import { AnimatePresence } from 'framer-motion'





function MyApp({ session, Component, ...pageProps }){

  const [modalOpen, setModalOpen] = useState(false);
  const [panelSide, setPanelSide] = useState(true);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);


  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  

  const modalClick = (event, modal, panel ) => {
    // console.log(bool);
    setModalOpen(modal);
    
    setPanelSide(panel)
    // console.log('_app panel'+ panel);
  };

  

  return (
    <>
      
      <Provider session={pageProps.session}>
      <Menu modalClick={modalClick} modalOpen={modalOpen} panelSide={panelSide}/>
      <Component {...pageProps} />

      <AnimatePresence
        initial={false}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} panelSide={panelSide}/>}
      </AnimatePresence>
      </Provider>

    </>
  )
}

export default MyApp
