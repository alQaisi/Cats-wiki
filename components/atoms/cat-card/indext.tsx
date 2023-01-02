import { CAT_CARDS_PROPS } from "../../../types/cat-cards.props";
import styles from "./cat.module.scss";
import Image from "next/image";
import Link from "next/link";
import { cls } from "../../../lib/cls";

const CatCard:React.FC<CAT_CARDS_PROPS>=({img,width,height,isMain,name,href})=>{
    
    const card=(
        <span>
            <div className={cls(styles.card,{[styles.main]:isMain},{[styles.link]:!!href})}>
                <Image className={cls(styles.cat)} src={img} width={width} height={height} alt={name}/>
            </div>
             <p className={styles.name +" text semibold "+styles.link}>{name}</p>
        </span>
    );
    
    const element=<Link scroll={false} href={`/cats/${href}`}>{ card }</Link>

    return href?element:card;
}

export default CatCard;