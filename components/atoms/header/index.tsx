import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cls } from "../../../lib/cls";

const Header=()=>{

    const router =useRouter();

    function goBack(evt:React.MouseEvent<HTMLAnchorElement>){
        evt.preventDefault();
        if(router.pathname.includes("error"))
            return router.push("/");
        router.back();
    }

    return(
        <div className={cls(styles.header)}>
            <Link href={"/"}><Image src="/CatwikiLogo.svg" width="128" height="43" alt="cat wiki logo"/></Link>
            { router.pathname!=="/" && <Link scroll={false} onClick={goBack} className={styles.back+" semibold"} href={"/"}>Go back</Link>}
        </div>
    );
}

export default Header;