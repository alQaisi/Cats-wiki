export default async function getCatsBreeds(req,res){
    const { query:{breed},method }=req;
    if(method!=="GET")
        return res.status(400).json({message:"GET Requests only"})
    const api_key = process.env.CAT_API_KEY;
    const allBreedsApiUrl=`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`;
    const breedWithImagesApiUrl=`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}&api_key=${api_key}&limit=8`
    let data=null;
    const apiUrl=breed?breedWithImagesApiUrl:allBreedsApiUrl;
    try{
        const response=await fetch(apiUrl);
        data=await response.json();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
    
}