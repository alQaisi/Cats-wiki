import Image from "next/image";
import { cls } from "../../../lib/cls";

function Loader():JSX.Element{
    return ( 
        <div className={cls("loader-wrapper")}>
            <div/>
            <Image src={"/loader.svg"} alt="loading" fill/>
        </div>
     );
}

export default Loader;