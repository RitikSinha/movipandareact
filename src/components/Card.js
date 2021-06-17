import poster from "../assets/captain.jpg"
import axios from 'axios';

const Card = ({ id ,name,year,lang,img}) => {

    // const delMovie =(id)=>{
    //     axios.delete(`https://glacial-headland-57223.herokuapp.com/api/movie/${id}`)
    //     .then(()=>console.log("deleted"));
    // }
    return (<div id="card">
        <img alt="poster" className="poster" src={img?img:poster} />
        <div>
            <h5>{name}</h5>
            <p>{`${year}                 ${lang}`}</p>
          
        </div>


    </div>);
}

export default Card;