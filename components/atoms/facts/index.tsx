import styles from "./facts.module.scss";
import { cls } from "../../../lib/cls";
import Image from "next/image";

const Facts:React.FC=()=>{
    return(
        <div className={cls(styles.facts)}>
            <div className={cls(styles.textContainer)}>
                <h1 className='heading bold large dark'>Why should you have a cat?</h1>
                <p className='text medium'>
                    Having a cat around you can actually trigger the release of claiming chemicals in your body
                    which lower your stress and anxiety leves
                </p>
            </div>
            <div className={cls(styles.imagesContainer)}>
                <span className={cls(styles.nestedImages)}>
                    <Image className={cls(styles.img1)}  src={"/image 1.png"} width={195} height={293} alt="Cat as a pet"/>
                    <Image className={cls(styles.img2)}  src={"/image 2.png"} width={273} height={167} alt="Cat as a pet"/>
                </span>
                <Image className={cls(styles.img3)} src={"/image 3.png"} width={238} height={385} alt="Cat as a pet"/>
            </div>
        </div>
    );
}
export default Facts;