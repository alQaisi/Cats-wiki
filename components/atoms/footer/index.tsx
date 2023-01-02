import styles from "./footer.module.scss";
import Image from "next/image";
import { cls } from "../../../lib/cls";

const Footer=()=>{
    return(
        <footer className={cls(styles.footer)}>
            <Image src="/CatwikilLogoWhite.svg" width="128" height="43" alt="cat wiki logo"/>
            <p className="text white regular">created by <a className="semibold" href="https://github.com/alqaisi">Ahmad Alqaisi</a> - devChallenges.io</p>
        </footer>
    );
}

export default Footer;