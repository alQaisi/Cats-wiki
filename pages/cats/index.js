import CatCard from "../../components/cat-card/cat-card.component.jsx";
import styles from "../../styles/cats.module.scss";
import Head from 'next/head';
import { Children } from "react";

export async function getStaticProps(){
    let data=[];
    try{
        const api_key = process.env.CAT_API_KEY;
        const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
        data=await response.json();
    }catch(err){
    }finally{
        return {
            props:{
                cats:data
            },
            revalidate:10,
        }
    }
}

function Cats({cats}) {
    const catsCards=Children.toArray(cats.map(({image,id,name},index)=><CatCard isMain={true} img={image?.url || "/image 1.png" } name={name} width="250" height="250" href={id} />))
    return (
        <>
        <Head>
            <title>All Cats</title>
            <meta name="description" content="Cats wiki | all cats | Most searched cats" />
        </Head>
        <div>
            <h1 className='heading bold large dark'>66+ Breeds For you to discover</h1>
            <div className={styles.container}>
                { 
                    cats.length===0?
                    <h1 className="heading large dark center-text">No data to display</h1>:
                    catsCards 
                }
            </div>
        </div>
        </>
    );
}

export default Cats;