import { useEffect, useState } from "react";
import { getOverview } from "../api/overviewApi";
import GutHealthScore from "./components/GutScoreCard";
import "./overview.css";
import SkeletonCard from "../components/Skeleton/skeleton";
import PhysiologicalFunctions from "./components/PhysiologicalFunctions";
import PhysiologicalFunctionsAccordion from "./components/PhysiologicalFunctionsAccordion";
import Navbar from "../components/Navbar/navbar";
import GenusLevelInfo from "./components/Genuslevelinfo";
import TopMicrobes from "./components/TopMicrobes";
import ToxinsMetabolites from "./components/ToxinMetabolites";

export default function Overview(){

    const [data,setData] = useState(null);

    useEffect(()=>{
        getOverview().then(setData);
    },[]);

    if(!data){
    return(
        <>
            <Navbar />
            <SkeletonCard/>
            <SkeletonCard/>
        </>
    )
}

return(
    <div className="overview-container">
		<Navbar />
        <section id="overview">
            <GutHealthScore data={data}/>
            <PhysiologicalFunctions />
        </section>

        <section id="functions">
            <PhysiologicalFunctionsAccordion />
        </section>
		<section id="microbes">
            <GenusLevelInfo />
			<TopMicrobes />
        </section>
		<section id="metabolites">
    		<ToxinsMetabolites />
        </section>

    </div>
);

}
