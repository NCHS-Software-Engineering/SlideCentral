import { useState, useEffect } from 'react';
import SlidesComponent from "./SlidesComponent";
import { useParams } from 'react-router-dom';


  
function ActivityDashboard() {
    const { activityId } = useParams();
    return (
        <main className="activity-dashboard-main-content">
            <div className="activity-dashboard">
                <SlidesComponent activityId={activityId}/>
            </div>
        </main>
    )
}

export default ActivityDashboard;