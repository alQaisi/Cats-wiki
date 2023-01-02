import Head from 'next/head';
import { Fragment } from 'react';
import { GetStaticProps, NextPage } from "next";
import { CAT } from '../types/cat';
import styles from '../styles/Home.module.scss';
import Hero from '../components/molecules/hero';
import Breifs from '../components/molecules/breifs';
import Facts from '../components/atoms/facts';
import { cls } from '../lib/cls';

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

const Home:NextPage<{cats:CAT[]}>=({cats})=>{
  return (
    <Fragment>
      <Head>
        <title>Cats wiki | Home</title>
        <meta name="description" content="Cats wiki application using Next.js" />
      </Head>
      <div className={styles.container}>
        <div className={cls(styles.homeComponent)}>
          <Hero cats={cats}/>
          <Breifs cats={cats}/>
        </div>
        <Facts/>
      </div>
    </Fragment>
  )
}
export default Home;
