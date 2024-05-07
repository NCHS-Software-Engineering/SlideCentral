import React, { useState } from 'react';
import styles from './activitydashboard.module.css';

const InviteStudents = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.endsWith('@stu.naperville203.org')) {
            alert('You have invited an invalid student email. Please make sure the email ends with @stu.naperville203.org.');
            return;
        }
        
        console.log(email);
        setMessage(`${email} has been successfully invited!`);
        axios.get('http://localhost:5000/user_matrix/' + email)
        .then((response) => {
            const user_id = response.data[0].user_id;
            console.log(user_id);
            axios.post('http://localhost:5000/api/sponsor', { sub: user_id , sub2: aID})
        })
          .catch(err => {
            console.error('Error getting Activity ID:', err);
        });
        setEmail('');
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    return (
        <div className={styles.inviteStudentsContainer}>
            <h3>Invite Students</h3>
            <div className={styles.emailForm}>
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.emailInput}
                        type="email"
                        placeholder="Enter student email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit" className={styles.submitEmailButton}>Submit</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
        
    );
};

export default InviteStudents;
