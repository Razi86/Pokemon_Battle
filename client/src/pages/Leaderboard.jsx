import axios from "axios";
import { useState,useEffect } from "react";
import {PacmanLoader} from "react-spinners"

function Leaderboard() {
    const [topScores,setTopScores]= useState([]);
    const [loading,setLoading]=useState(true);
    const SERVER_URL=import.meta.env.VITE_ORIGIN_URL;

    useEffect(()=>{
        const fetchTopScores=async()=>{
            try {
                const res=await axios.get(`${SERVER_URL}leaderboard`);
                console.log(res.data.scores)
                setTopScores(res.data.scores);
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }
        }
        fetchTopScores();
    },[])

  return (
    <>
        {loading ? (<PacmanLoader color="#1c398e" size={30} />) :(
        <div className="pt-[110px]"> 
            <div 
            className="text-center font-bold luckiest-guy-regular text-3xl text-blue-900 pt-8">
                LEADERBOARD
            </div>
            <div className="flex flex-wrap justify-center items-center mt-8 px-[10%]">
                {topScores?.map((score,index)=>
                    score.user&&(
                        <div 
                        className="flex items-center text-white text-center font-bold luckiest-guy-regular text-xl py-2 my-5 z-10" 
                        key={score._id}>
                            <div className="text-blue-900 relative left-14 text-shadow-[1px_1px_1px_rgb(113,150,240)]">{index+1}th</div>
                                <img src={score.user.image} alt={score.user.first_name} 
                                    className="w-20 h-20 rounded-full mx-auto left-15 relative border-1 border-blue-900 shadow-[4px_7px_3px_-3px_rgba(11,0,112,0.75)]" />
                            <div className="flex justify-between bg-[#533dc6] text-shadow-[3px_3px_1px_rgb(0,0,0)] rounded-full p-3 gap-8 pl-17">
                            <div>
                                    {score.user.first_name} {score.user.last_name}
                            </div>
                            <div>
                                    {score.score} points
                            </div>
                        </div>
                    </div>
                    )
            )}
            </div>
            
            <div className=" leaderboard-bg mx-auto">
                
            </div>
        </div>
           
        )}
    </>
  )
}

export default Leaderboard