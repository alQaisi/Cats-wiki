import styles from "./hero.module.scss";
import Image from "next/image";
import SearchBox from "../search-box";
import { CAT } from "../../../types/cat";

const Hero:React.FC<{cats:CAT[]}>=({cats})=>{
    return(
        <div className={styles.hero}>
          <Image src={"/CatwikilLogoWhite.svg"} width={250} height={87} alt="Cat wiki logo"/>
          <p className={styles.heroText+" white medium"}>Get to know more about your cat bread</p>
          <SearchBox data={cats}/>
        </div>
    );
}
export default Hero;