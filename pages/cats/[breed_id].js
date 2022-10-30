import styles from "../../styles/catPage.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Children, useEffect,useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader/Loader.component";
import Lightbox from "../../components/lightbox/lightbox.component";
import { AnimatePresence } from "framer-motion";

export async function getStaticPaths(){
    let data=[];
    let paths=[];
    const api_key = process.env.CAT_API_KEY;
    try{
        const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
        data=await response.json();
        paths=data.map(({id})=>({params:{breed_id:id}}));
    }catch(err){
    }finally{
        return{
            paths,
            fallback:true
        }
    }
}

export async function getStaticProps({params:{breed_id}}){
    const api_key = process.env.CAT_API_KEY;
    let data=null;
    try{
        const res=await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_id}&api_key=${api_key}&limit=8`);
        data=await res.json();
    }catch(err){
    }
    return {props:{
        data:data,
    }}
}

function CatPage({data}) {

    const [userSelectedImage,setUserSelectedImage]=useState(null);

    const { isFallback, push } = useRouter();
    
    useEffect(()=>{
        if(!isFallback && (data===null || !data?.length )){
            push("/404");
        }
    },[isFallback,data,push]);
    

    if(isFallback || (data===null || !data?.length))
        return <Loader/>

    const {name,description,adaptability,affection_level,child_friendly,
        grooming,intelligence,social_needs,stranger_friendly,
        temperament,life_span,country_code}=data[0]?.breeds[0];
    const images= Children.toArray(data.map(({url},index)=><Image onClick={()=>setUserSelectedImage(index)} src={url} width={278} height={278} alt={name}/>));
    const catsInfo= Children.toArray([["Adaptability",adaptability],["Affection level",affection_level],["Child Friendly",child_friendly],["Grooming",grooming],["Intelligence",intelligence],["Social needs",social_needs],["Stranger friendly",stranger_friendly]]
        .map(item=>(
            <p className={"text medium "+styles.ratingContainer}>
                <span className="bold">{item[0]}:</span>
                <span className={styles.ratingWrapper}>
                    { Children.toArray((new Array(5).fill(0)).map((elem,index)=><span className={styles.rating+" "+(item[1]>=index+1?styles.active:"") }></span>)) }
                </span>
            </p>
        )));
    return(
        <>
        <Head>
            <title>{name}</title>
            <meta name="description" content={description} />
        </Head>
        <div className={styles.container}>
            <div className={styles.dataContainer}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageWrapperElem}></div>
                    <Image onClick={()=>setUserSelectedImage(0)} src={data[0].url} fill alt={name}/>
                </div>
                <div className={styles.infoContainer}>
                    <h3 className="heading dark semibold">{ name }</h3>
                    <p className="text medium">{description}</p>
                    <p className="text medium"><span className="bold">Temperament: </span> {temperament} </p>
                    <p className="text medium"><span className="bold">Origin: </span>{country_code}</p>
                    <p className="text medium"><span className="bold">Life Span: </span> {life_span} years </p>
                    { catsInfo }
                </div>
            </div>
            <h3 className="heading semibold">Other photos</h3>
            <div className={styles.imagesContainer}>
                {images}
            </div>
        </div>
        <AnimatePresence>
            { userSelectedImage!==null && <Lightbox images={data.map(({url})=>url)} name={name} userCurrentImage={userSelectedImage} close={()=>setUserSelectedImage(null)}/> }
        </AnimatePresence>
        </>
    );
}

export default CatPage;