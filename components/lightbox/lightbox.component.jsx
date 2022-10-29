import styles from "./lightbox.module.scss";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineNavigateNext,MdOutlineNavigateBefore, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"

function Lightbox({images,name,userCurrentImage,close}) {
    console.log(userCurrentImage);
    const [currentImage,setCurrentImage]=useState(userCurrentImage);
    function handleChangeImage(newIndex){
        if(images[currentImage+newIndex]){
            setCurrentImage(currentImage+newIndex);
        }
    }
    const Images=images.map((image,index)=><Image key={index} src={image} fill alt={name}/>);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.container}>
            <motion.div className={styles.imageWrapper}>
                <div className={styles.wrapperElem}/>
                <AnimatePresence>
                    { userCurrentImage && <motion.span key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeInOut", duration: .4 }}  >{Images[currentImage] }</motion.span> }
                </AnimatePresence>
                <MdOutlineNavigateBefore onClick={()=>handleChangeImage(-1)} className={styles.icon}/>
                <MdOutlineNavigateNext className={styles.icon} onClick={()=>handleChangeImage(1)}/>
            </motion.div>
            <MdClose className={styles.closeIcon} onClick={close}/>
        </motion.div>
    );
}

export default Lightbox;