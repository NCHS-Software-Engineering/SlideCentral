import { useState, useEffect } from 'react';
import SlidesComponent from "./SlidesComponent";

function Dashboard() {

    return (
        <main className="activity-dashboard-main-content">
            <div className="activity-dashboard">
                <SlidesComponent />
            </div>
        </main>
    )
}

export default Dashboard;