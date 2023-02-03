import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import dynamic from 'next/dynamic' 
import Backdrop from "../Backdrop"
import LoginForm from '../LoginDetails'

const DynamicHeader = dynamic(() => import ('../signupdetails'),{
    loading: () => 'Please Wait...',
})


const dropIn = {
    hidden: {
        y:"-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1 ,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },

    },
    exit: {

    },
}

const Modal = ({ handleClose, text , panelSide}) => {


    const [compSwitch, setcompSwitch] = useState(true);
    
    useEffect(() => {
        setcompSwitch(panelSide)

    },[panelSide])
    

    return (
        <>
        
        <Backdrop onClick={handleClose}>
            <motion.div onClick={(e) => {e.stopPropagation()} }
            className="modalCustom"
            variants={dropIn}
            initial= "hidden"
            animate= "visible"
            exit= "exit"
            >
                {compSwitch ? <LoginForm /> : <DynamicHeader /> }
                
       
            </motion.div>


        </Backdrop>
        </>
    )

};

export default Modal;