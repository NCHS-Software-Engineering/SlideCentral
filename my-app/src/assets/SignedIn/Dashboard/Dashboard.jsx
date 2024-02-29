import DComponentActivities from "./DComponentActivities";
import DComponentNotifications from "./DComponentNotifications";
import './Dashboard.css';

function Dashboard() {
    return (
        <main className="dashboard-main-content">
            <div className="dashboard">
                <DComponentActivities/>
                <DComponentNotifications />
            </div>
        </main>
    )
}

export default Dashboard;