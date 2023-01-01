export type CAT={
    id:string,
    name:string,
    temperament:string
    description:string,
    adaptability:number,
    affection_level:number,
    child_friendly:number,
    grooming:number,
    intelligence:number,
    social_needs:number,
    stranger_friendly:number,
    life_span:`${number} - ${number}`,
    country_code:string,
    image:{
        id:string,
        width:number,
        height:number,
        url:string
    }
}