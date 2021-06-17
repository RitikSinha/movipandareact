import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";




const Upload = () => {
    const [name, setName ] = useState('');
    const [year,setYear] = useState('');
    const [lang,setLang] = useState('');
    const [image,setImage] = useState('');
    const [img,setImg] = useState('');
    const[percentage ,setPercentage] = useState(0);
    const[loading,setLoading] = useState(false);
//check file type
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }
  
  function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'png':
        //etc
        return true;
    }
    return false;
  }
  ////
  //year validation

  function yearValidation(str) {
      let y = str;
    var text = /^[0-9]+$/;
    if (y != 0) {
        if ((y != "") && (!text.test(y))) {

            alert("Please Enter Numeric Values Only");
            return false;
        }

        if (y.length != 4) {
            alert("Year is not proper. Please check");
            return false;
        }
        var current_year=new Date().getFullYear();
        if((y < 1920) || (y > current_year))
            {
            alert("Year should be in range 1920 to current year");
            return false;
            }
        return true;
    }
}
  //
   const options = {
       onUploadProgress : (ProgressEvent)=>{
           const {loaded, total} = ProgressEvent;
           let percent = Math.floor((loaded*100)/total);
           setPercentage(percent);
       }
   }
  
const uploadFiles = ()=>{
    setLoading(true);
const d = new FormData();
d.append("file",image);
d.append("upload_preset","project");
d.append("cloud_name","ritiksinha-in");
try{
    axios.request({
        method: "POST",
        url:"https://api.cloudinary.com/v1_1/ritiksinha-in/image/upload",
        data: d,
        onUploadProgress:options.onUploadProgress


    })
    .then(res=>{
        console.log(res.data.url);
        console.log(img);
        setImg(res.data.url);
        const url = "https://glacial-headland-57223.herokuapp.com/api/movie";
        const data = {
            name : name,
            year: year,
            language: lang,
            img: res.data.url,
            
        } ; 
        try{
            if(name!== "" && year !== "" && lang !== "" && data.img !== ""){
                axios.post(url,  data )
                .then(response => {
                  console.log(response);
                  console.log(response.data);
                  setLang("");
                  setName("");
                  setYear("");
                  setImg("");
                  setImage("");
                  setPercentage("");
                  setLoading(false);

                })
                
            }else{
                return 0;
            }
        }
        catch(er){
            console.log(er);
        }
       

    })
    .catch((err)=>console.log("network err"+err));
}
catch(err){
    console.log("error......"+err);

}


}
    

    const postData =(e)=>{
        e.preventDefault();
        if(year!== "" && yearValidation(year) && lang !== "" && name !== "" && image !== ""){
            if(isImage(image.name)){
                uploadFiles();
            }else{
                window.alert("Please use Proper image");
            }
        }
        else{
            window.alert("all fields are required");
        }
        

        
        
      
      
    }

    return ( <>
    {!loading?( <div className=" flex upload">
            <h3> Upload Your Movie </h3>
            
            <form onSubmit={(e)=>postData(e)}>
               <div>
               <input  onChange={(e)=>setImage(e.target.files[0])} id="thumbnail" type="file"/>
               
               </div>
             
               <div>
                  
                   <input value={name} onChange={(e)=>setName(e.target.value)} placeholder=" Movie's name" for="name" type="text"  />
               </div>
               <div>
                 
                   <input value={year} onChange={(e)=>setYear(e.target.value)} placeholder="Year" for="year" type="text"  />
               </div>
               <div>
                 
                   <input value={lang} onChange={(e)=>setLang(e.target.value)}  placeholder="language"for="language" type="text"  />
               </div>
                
                <button type="submit" >
                   <h4> Upload</h4>
                </button>
               
            </form>
                
        </div>

    ):(
        <div className="progrssbar">
            <h3> Uploading..</h3>
        <ProgressBar  completed={percentage}/>
        </div>
    )}
   
   
    
        </>);
}
 
export default Upload;