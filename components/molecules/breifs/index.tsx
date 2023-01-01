import styles from "./breifs.module.scss";
import CatCard from "../../atoms/cat-card/indext";
import { CAT } from "../../../types/cat";
import { cls } from "../../../lib/cls";
import Link from 'next/link';
import { CgArrowLongRight } from "react-icons/cg";
import Image from "next/image";
import { Children } from "react";

const Breifs:React.FC<{cats:CAT[]}>=({cats})=>{
    const catsCards=cats && Children.toArray(cats.slice(0,4).map(({image,id,name},index)=><CatCard isMain={index===0} img={image.url} name={name} width={220} height={220} href={id} />))
    return(
        <div className={cls(styles.breifs)}>
            <p className='regular text after'>Most Searched Breeds</p>
            <div className={cls(styles.title)}>
                <h1 className='heading bold large dark'>66+ Breeds For you to discover</h1>
                <Link scroll={false} href="/cats" className='links bold'><span className='with-icon'>see more <CgArrowLongRight/></span></Link>
            </div>
            <div className={cls(styles.cards)}>
                { catsCards }
            </div>
        </div>
    );
}
export default Breifs;