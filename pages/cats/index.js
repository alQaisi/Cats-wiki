import CatCard from "../../components/cat-card/cat-card.component.jsx";
import styles from "../../styles/cats.module.scss";
import { Children } from "react";

export async function getStaticProps(){
    const api_key = process.env.CAT_API_KEY;
    const response=await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`);
    const data=await response.json();
    return {props:{
      cats:data
    }}
}

function Cats({cats}) {
    const catsCards=Children.toArray(cats.map(({image,id,name},index)=><CatCard isMain={true} img={image?.url || "/image 1.png" } name={name} width="250" height="250" href={id} />))
    return (
        <div>
            <h1 className='heading bold large dark'>66+ Breeds For you to discover</h1>
            <div className={styles.container}>
                {catsCards}
            </div>
        </div>
    );
}

export default Cats;