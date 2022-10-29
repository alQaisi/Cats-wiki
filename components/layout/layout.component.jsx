import styles from "./layout.module.scss";
import Image from "next/image";
import {useRouter} from 'next/router';
import Link from "next/link";
import NextNProgress from 'nextjs-progressbar';


function Layout({children}) {
    const router =useRouter();
    function goBack(evt){
        evt.preventDefault();
        if(router.pathname.includes("error"))
            return router.push("/");
        router.back();
    }
    return (
        <>
        <NextNProgress color="#5f5101" />
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href={"/"}><Image src="/CatwikiLogo.svg" width="128" height="43" alt="cat wiki logo"/></Link>
                { router.pathname!=="/" && <Link scroll={false} onClick={goBack} className={styles.back+" semibold"} href={"/"}>Go back</Link>}
            </div>
            {children}
            <footer className={styles.footer}>
                <Image src="/CatwikilLogoWhite.svg" width="128" height="43" alt="cat wiki logo"/>
                <p className="text white regular">created by <a className="semibold" href="https://github.com/alqaisi">Ahmad Alqaisi</a> - devChallenges.io</p>
            </footer>
        </div>
        </>
    );
}

export default Layout;