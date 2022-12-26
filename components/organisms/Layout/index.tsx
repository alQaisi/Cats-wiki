import styles from "./layout.module.scss";
import { Fragment } from "react";
import NextNProgress from "nextjs-progressbar";
import { cls } from "../../../lib/cls";
import Header from "../../atoms/header";
import Footer from "../../atoms/footer";

const Layout:React.FC<{children:React.ReactNode}>=({children})=>{
    return (
        <Fragment>
            <NextNProgress color="#5f5101"/>
            <div className={cls(styles.container)}>
                <Header/>
                {children}
                <Footer/>
            </div>
        </Fragment>
    );
}

export default Layout;