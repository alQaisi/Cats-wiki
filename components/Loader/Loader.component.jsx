import Image from "next/image";

function Loader() {
    return ( 
        <div className="loader-wrapper">
            <div/>
            <Image src={"/loader.svg"} alt="loading" fill/>
        </div>
     );
}

export default Loader;