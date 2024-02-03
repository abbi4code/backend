import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'
cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET
});

    
const uploadoncloudinary = async (localfilepath) => {
    try {

        if(!localfilepath) return null
        //else upload the file
        /* we have to set the localfilepath 
        what we doing is uploading all files on localfilepath then cloudinary will take 
        all the pfiles from this path and upload it on the server*/

        //we can remove the const but we want to
        const response = await cloudinary.uploader.upload(localfilepath, {
            //we can declare what types of files we are uploading
            resource_type: "auto"
        }) 
        console.log("files uplaod on cloudinary", response.url)  
        return response     
    } catch (error) {

        //remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localfilepath)
        return null
        
    }
}

export default uploadoncloudinary;




//we can siply use below to upload a file but its not use in industry
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


cloudinary.config({ 
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
   api_secret: process.env.CLOUDINARY_API_SECRET
});
