import styles from "./search-box.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import React, { useState,Children } from "react";
import { MdOutlineClose } from "react-icons/md";
import { CAT } from "../../../types/cat";
import { cls } from "../../../lib/cls";

const SearchBox:React.FC<{data:CAT[]}>=({data})=>{

    function handleInputChange({target:{value}}:React.ChangeEvent<HTMLInputElement>){
        setFilter(value.toLowerCase());
    }

    const [filter,setFilter]=useState("");
    const [isModal,setIsModal]=useState(false);

    const searchData=Children.toArray(data.filter(({name})=>name.toLowerCase().includes(filter)).map(({id,name})=><Link href={`/cats/${id}`}><p className="medium text black">{name}</p></Link>));

    return(
        <div className={cls(styles.container,{[styles.modal]:isModal})} onFocus={()=>setIsModal(true)} onBlur={()=>setTimeout(()=>setIsModal(false),100)}>
            <div className={cls(styles.inputContainer)}>
                <input className={styles.input+" medium"} aria-label="search for cats breads" placeholder="Enter your breed" value={filter} onChange={handleInputChange} />
                <AiOutlineSearch className={styles.icon}/>
            </div>
            { (isModal && filter) &&
                <div className={styles.searchData}>
                    {searchData}
                </div>
            }
            { isModal && <MdOutlineClose onClick={()=>setTimeout(()=>setIsModal(false),100)} className={styles.closeIcon}/> }
        </div>
    );
}

export default SearchBox;