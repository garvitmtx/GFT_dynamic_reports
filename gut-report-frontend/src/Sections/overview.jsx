import "./overview.css";
import Navbar from "../components/Navbar/navbar";
import SkeletonCard from "../components/Skeleton/skeleton";
import GutHealthScore from "./components/GutScoreCard";
import PhysiologicalFunctions from "./components/PhysiologicalFunctions";
import PhysiologicalFunctionsAccordion from "./components/PhysiologicalFunctionsAccordion";
import GenusLevelInfo from "./components/Genuslevelinfo";
import TopMicrobes from "./components/TopMicrobes";
import ToxinsMetabolites from "./components/ToxinMetabolites";
import PhysiologicalToxinFunctions from "./components/ToxinCard";

import useReport from "../hooks/useReport";

export default function Overview() {

  const { data, loading, error } = useReport();
	console.log("data",data)
  if (loading) {
    return (
      <>
        <Navbar />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <p style={{ padding: 24, color: "red" }}>
          {error}
        </p>
      </>
    );
  }

  return (
    <div className="overview-container">

      <Navbar />

      <section id="overview">
        <GutHealthScore data={data} />
        <PhysiologicalFunctions data={data.report.comparison_ratios} />
        {/* <PhysiologicalToxinFunctions data={data.report} /> */}
      </section>

      <section id="functions">
        <PhysiologicalFunctionsAccordion data={data.report} />
      </section>

      <section id="microbes">
        <GenusLevelInfo data={data.report} />
        <TopMicrobes data={data.report} />
      </section>

      <section id="metabolites">
        <ToxinsMetabolites data={data.report} />
      </section>

    </div>
  );
}











// import { useMemo } from "react";
// import "./overview.css";
// import Navbar from "../components/Navbar/navbar";
// import SkeletonCard from "../components/Skeleton/skeleton";
// import GutHealthScore from "./components/GutScoreCard";
// import PhysiologicalFunctions from "./components/PhysiologicalFunctions";
// import PhysiologicalFunctionsAccordion from "./components/PhysiologicalFunctionsAccordion";
// import GenusLevelInfo from "./components/Genuslevelinfo";
// import TopMicrobes from "./components/TopMicrobes";
// import ToxinsMetabolites from "./components/ToxinMetabolites";
// import PhysiologicalToxinFunctions from "./components/ToxinCard";

// import useReport from "../hooks/useReport";

// export default function Overview() {

//   // ✅ Fetch report ONCE
//  const { data, loading, error } = useReport();

//   if (loading) {
//       return (
//           <>
//         <Navbar />
//         <SkeletonCard />
//         <SkeletonCard />
//       </>
//     );
// }

// // -------------------------
// // Error state
// // -------------------------
// if (error) {
//     console.log("RLE",error);
//     return (
//       <>
//         <Navbar />
//         <p style={{ padding: 24, color: "red" }}>
//           Failed to load report
//         </p>
//       </>
//     );
//   }

//   // -------------------------
//   // Success state
//   // -------------------------
//   return (
//     <div className="overview-container">

//       <Navbar />

//       <section id="overview">
//         <GutHealthScore data={data} />
//         <PhysiologicalFunctions data={data.comparison_ratios} />
//         <PhysiologicalToxinFunctions data= {data} />
//       </section>

//       <section id="functions">
//         <PhysiologicalFunctionsAccordion data={data} />
//       </section>

//       <section id="microbes">
//         <GenusLevelInfo data={data} />
//         <TopMicrobes data={data} />
//       </section>

//       <section id="metabolites">
//         <ToxinsMetabolites data={data} />
//       </section>

//     </div>
//   );
// }
