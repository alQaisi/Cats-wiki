import { CAT } from "./cat"

type BREED_INFO={
    breeds:CAT[],
    id:string,
    url:string,
    width:number,
    height:number
} 

export type BREED=BREED_INFO[] | null;