import "./skeleton.css";

export default function SkeletonCard(){
    return(
        <div className="skeleton-card">
            <div className="skeleton shimmer title"/>
            <div className="skeleton shimmer line"/>
            <div className="skeleton shimmer line short"/>
        </div>
    )
}
