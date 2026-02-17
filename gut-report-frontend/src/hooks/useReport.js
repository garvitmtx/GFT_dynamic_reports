import { useEffect, useState } from "react";

export default function useReport(token){

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{

        if(!token) return;

        const fetchReport = async ()=>{

            try{
                const res = await fetch(
                  `http://127.0.0.1:8000/report?token=${token}`
                );

                // ⭐ VERY IMPORTANT
                if(!res.ok){
                    throw new Error(`Server Error: ${res.status}`);
                }

                const json = await res.json();
                setData(json);

            }catch(err){
                console.error("useReport error:", err);
                setError(err);
            }
            finally{
                setLoading(false);
            }
        };

        fetchReport();

    },[token]);

    return {data,loading,error};
}
