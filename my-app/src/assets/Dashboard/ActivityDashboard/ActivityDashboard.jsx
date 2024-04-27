import { useState, useEffect } from 'react';
import SlidesComponent from "./SlidesComponent";
import { useParams } from 'react-router-dom';
import InviteStudents from './InviteStudents';
import styles from './activitydashboard.module.css';


  
function ActivityDashboard() {
    const { activityId } = useParams();
    return (
        <main className={styles.activityDashboardMainContent}>
            <div className={styles.activityDashboard}>
                <SlidesComponent activityId={activityId}/>
                <InviteStudents />
            </div>
        </main>
    )
}

export default ActivityDashboard;