import CatCard from "../../components/atoms/cat-card/indext";
import Head from "next/head";
import { Children,Fragment } from "react";
import styles from "./cats.module.scss";
import { cls } from "../../lib/cls";
import { GetStaticProps,NextPage } from "next";
import { CAT } from "../../types/cat";

export const getStaticProps:GetStaticProps=async()=>{
    const api_key = process.env.CAT_API_KEY;
    let data:CAT[]=[];
    try{
        const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
        data=await response.json();
      }catch(err){ 
      }finally{
        return {
          props:{
            cats:data || []
          },
          revalidate:10,
        }
      }
}

const Cats:NextPage<{cats:CAT[]}>=({cats})=>{
    
    const catsCards=Children.toArray(cats.map(({image,id,name})=><CatCard isMain={true} img={image?.url || "/image 1.png" } name={name} width={250} height={250} href={id} />))
    return(
        <Fragment>
            <Head>
                <title>All Cats</title>
                <meta name="description" content="Cats wiki | all cats | Most searched cats" />
            </Head>
            <div>
                <h1 className='heading bold large dark'>66+ Breeds For you to discover</h1>
                <div className={cls(styles.container)}>
                    { 
                        cats.length===0?
                        <h1 className="heading large dark center-text">No data to display</h1>:
                        catsCards 
                    }
                </div>
            </div>
        </Fragment>
    );
}
export default Cats;