import { SessionProvider } from "next-auth/react"
import { VerifiedProvider } from '../context/verifiedContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import '../styles/Modal.css'
import Modal from '../components/Modal/index.jsx'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/js/bootstrap';







function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [panelSide, setPanelSide] = useState(true);
  const [verified, setVerified] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
      .catch(error => console.log('Loading Bootstrap failed', error));
  }, [])


  useEffect(() => {

    if (pageProps.teamItem?.[0]?._id) {
      setVerified(true);
    }

  }, [pageProps.teamItem]);



  const modalClick = (event, modal, panel) => {
    // console.log(bool);
    setModalOpen(modal);

    setPanelSide(panel)
    // console.log('_app panel'+ panel);
  };


  return (
    <>
      <VerifiedProvider>
        <SessionProvider session={session}>
          <Menu modalClick={modalClick} modalOpen={modalOpen} panelSide={panelSide} />
          <Component {...pageProps} />

          <AnimatePresence
            initial={false}
          >
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} panelSide={panelSide} />}
          </AnimatePresence>
          <ToastContainer position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light" />
        </SessionProvider>
      </VerifiedProvider>
    </>
  )
}

export default MyApp


