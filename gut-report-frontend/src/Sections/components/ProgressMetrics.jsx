import "./ProgressMetrics.css";

export default function ProgressMetrics({data}){

    const metrics = [
        {label:"Diversity", value:data.diversity, max:2},
        {label:"Evenness", value:data.evenness, max:2},
        {label:"Firmicutes/Bacteroidetes Ratio", value:data.ratio, max:3},
        {label:"Harmful Toxins %", value:data.harmfulPercent, max:100}
    ];

    return(
        <div className="metrics-grid">

            {metrics.map((m,i)=>(
                <div key={i} className="metric-card">

                    <div className="metric-header">
                        <h4>{m.label}</h4>
                        <span>{m.value}</span>
                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width:`${(m.value/m.max)*100}%`
                            }}
                        />
                    </div>

                </div>
            ))}

        </div>
    )
}
