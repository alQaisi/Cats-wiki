import styles from "./catPage.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Children, Fragment, useEffect,useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../../components/atoms/Loader";
import Lightbox from "../../../components/organisms/lightbox";
import Rating from "../../../components/atoms/rating-element";
import { AnimatePresence } from "framer-motion";
import { GetStaticPaths,GetStaticProps,NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CAT } from "../../../types/cat";
import { BREED } from "../../../types/breed"; 
import { cls } from "../../../lib/cls";

interface Params extends ParsedUrlQuery{
    breed_id:string
}

export const getStaticPaths:GetStaticPaths=async()=>{
    let data:CAT[]=[];
    let paths:{params:{breed_id:string}}[]=[];
    const api_key = process.env.CAT_API_KEY;
    try{
        const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
        data=await response.json();
        paths=data.map(({id})=>({
            params:{breed_id:id}
        }));
    }catch(err){
    }finally{
        return{
            paths,
            fallback:true
        }
    }
}

export const getStaticProps:GetStaticProps<{data:BREED},Params>=async(context)=>{
    const {breed_id}=context.params!;
    const api_key = process.env.CAT_API_KEY;
    let data:BREED=null;
    try{
        const res=await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_id}&api_key=${api_key}&limit=8`);
        data=await res.json();
    }catch(err){
    }finally{
        return {
            props:{
                data:data,
            },
            revalidate:10,
        }
    }
}

const CatPage:NextPage<{data:BREED}>=({data})=>{
    const [userSelectedImage,setUserSelectedImage]=useState<number | null>(null);
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

    const catsData:[string,number][]=[["Adaptability",adaptability],["Affection level",affection_level],["Child Friendly",child_friendly],["Grooming",grooming],["Intelligence",intelligence],["Social needs",social_needs],["Stranger friendly",stranger_friendly]];
    const catsInfo= Children.toArray(catsData.map(item=><Rating rating={item}/>));
    
    return(
        <Fragment>
            <Head>
                <title>{ name }</title>
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
        </Fragment>
    );
}
export default CatPage;