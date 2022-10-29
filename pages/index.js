import CatCard from '../components/cat-card/cat-card.component';
import SearchBox from '../components/search-box/search-box.component';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { CgArrowLongRight } from "react-icons/cg";
import { Children } from 'react';

export async function getStaticProps(){
  const api_key = process.env.CAT_API_KEY;
  let data=null;
  try{
    const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
    data=await response.json();
  }
  catch(err){
  }
  return {props:{
    cats:data
  }}
}

export default function Home({cats}) {
  const catsCards=Children.toArray(cats.slice(0,4).map(({image,id,name},index)=><CatCard isMain={index===0} img={image.url} name={name} width="220" height="220" href={id} />))
  return (
    <div className={styles.container}>
      <Head>
        <title>Cats wiki | Home</title>
        <meta name="description" content="Cats wiki application using Next.js" />
      </Head>
      <div className={styles.homeComponent}>
        <div className={styles.hero}>
          <Image src={"/CatwikilLogoWhite.svg"} width={250} height={87} alt="Cat wiki logo"/>
          <p className={styles.heroText+" white medium"}>Get to know more about your cat bread</p>
          <SearchBox data={cats}/>
        </div>
        <div className={styles.breifs}>
          <p className='regular text after'>Most Searched Breeds</p>
          <div className={styles.title}>
            <h1 className='heading bold large dark'>66+ Breeds For you to discover</h1>
            <Link scroll={false} href="/cats" className='links bold'><span className='with-icon'>see more <CgArrowLongRight/></span></Link>
          </div>
          <div className={styles.cards}>
            { catsCards }
          </div>
        </div>
      </div>
      <div className={styles.facts}>
        <div className={styles.textContainer}>
          <h1 className='heading bold large dark'>Why should you have a cat?</h1>
          <p className='text medium'>
            Having a cat around you can actually trigger the release of claiming chemicals in your body
            which lower your stress and anxiety leves
          </p>
        </div>
        <div className={styles.imagesContainer}>
          <span className={styles.nestedImages}>
            <Image className={styles.img1} src={"/image 1.png"} width={195} height={293} alt="Cat as a pet"/>
            <Image className={styles.img2} src={"/image 2.png"} width={273} height={167} alt="Cat as a pet"/>
          </span>
          <Image className={styles.img3} src={"/image 3.png"} width={238} height={385} alt="Cat as a pet"/>
        </div>
      </div>
    </div>
  );
}
