import styles from "./layout.module.scss";
import { Fragment } from "react";
import NextNProgress from "nextjs-progressbar";
import { cls } from "../../../lib/cls";
import Header from "../../atoms/header";
import Footer from "../../atoms/footer";
import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from 'next/router';

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 200, y: 0 },
  };

const Layout:React.FC<{children:React.ReactNode}>=({children})=>{
    const router =useRouter();
    return (
        <Fragment>
            <NextNProgress color="#5f5101"/>
            <div className={cls(styles.container)}>
                <Header/>
                <AnimatePresence mode='wait' initial={true} onExitComplete={()=> window.scrollTo(0,0)}>
                    <motion.main key={router.pathname==="/"?"home":router.pathname} variants={variants} initial="hidden" animate="enter" exit="exit">
                        {children}
                    </motion.main>
                </AnimatePresence>
                <Footer/>
            </div>
        </Fragment>
    );
}

export default Layout;