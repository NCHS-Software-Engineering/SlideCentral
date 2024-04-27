import React, { useState } from 'react';
import styles from './activitydashboard.module.css';

const InviteStudents = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the email ends with @stu.naperville203.org
        if (!email.endsWith('@stu.naperville203.org')) {
            // If it doesn't, show a popup message and return early
            alert('You have invited an invalid student email. Please make sure the email ends with @stu.naperville203.org.');
            return;
        }
        // Perform any necessary logic with the submitted email
        console.log(email);
        // Reset the email input
        setEmail('');
    };

    return (
        <div className={styles.inviteStudentsContainer}>
            <h3>Invite Students</h3>
            <div className = {styles.emailForm}>
                <form onSubmit={handleSubmit}>
                    <input className={styles.emailInput}
                        type="email"
                        placeholder="Enter student email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit" className={styles.submitEmailButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default InviteStudents;