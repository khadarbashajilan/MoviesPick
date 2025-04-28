import { Client, Query, Databases, ID } from "appwrite";
const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;


const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async(search, movie) =>{
    //Use Appwrite SDK to check if already exists in the database
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('search',search),
        ])
        //If it does, update the count
        if(result.documents.length>0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID,COLLECTION_ID, doc.$id, {
                count:doc.count+1,
            })
        //If it doesnt, create a new document with the search and count as 1
            
        }else{
            await database.createDocument(DATABASE_ID,COLLECTION_ID, ID.unique(),{
                search,
                count:1,
                poster_url:movie.Poster,
                movie_id: movie.imdbID,
            })
            console.log(movie.Poster)
            console.log('im in else');
        }
    }
    catch(e){
        console.error(e);
    }
}

export const getTrendingmovies= async() =>{
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents;
    }
    catch(e){
        console.error(e);
    }
}