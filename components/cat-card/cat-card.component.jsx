import styles from "./cat.module.scss";
import Image from "next/image";
import Link from "next/link";

function CatCard({img,width,height,name,isMain,href}) {
    
    const card=(
        <span>
            <div className={styles.card+" "+(isMain?styles.main:"")+" "+(href?styles.link:"")}>
                <Image className={styles.cat} src={img} width={width} height={height} alt={name}/>
            </div>
            { name && <p className={styles.name +" text semibold "+styles.link}>{name}</p>}
        </span>);

    const element=<Link scroll={false} href={`/cats/${href}`}>{ card }</Link>
    
    return href?element:card;
}

export default CatCard;