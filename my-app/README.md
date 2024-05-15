# Brief Overview of the Project

Hello! This is the app called SlideCentral, developed by a group of students for Dr. Miller's Software Engineering class. This app aims to provide an easier solution for students and teachers alike to view school activities, and for club sponsors to upload their upcoming activities to garner a larger amount of participation. 

# Platform Requirements
SlideCentral is hosted on a website coded in ReactJS, and uses SQL to store all of its user information. Any desktop operating system will be fine, as long as it has a browser. This app is not designed to be used for mobile devices.


# Sequential Installation Instructions / How to Run Project
0. Make sure that React.js and Node.js have been installed properly
1. To start off, go into terminal and cd into the folder "my-app"
2. Next, run the command `npm start` to start the website, and in a different
   terminal, run `npm server.js` to start the local server.
3. If any problems occur, run `npm install` to install any necessary dependencies

EXPECTED RESULTS: There should be no errors. Students and teachers should properly be able to log in, create and remove activities, upload slides, and they should be added to carousels.

# Project Architecture
Uploaded images are saved within the public folder -> slides folder. Everything else will be inside of src. The assets folder includes all of the physical components for our app. The home pages and styles are stored within HomeScreen. Inside the dashboard folder is everything including beyond the dashboard. Inside this folder are folders for Slide Creation and the Activity Dashboard, each including their own css modules for styling. All of our components are combined using routing in the App.jsx folder inside of assets.

# Project Data Schema
1. The activity_matrix table stores all of our activities. They are given a unique Activity ID key inside of the activity_id column, and the actual activity name is stored in the activity_name column. 
2. The activity_spontor table links a user ID to an activity. Users can be linked to multiple activities. The user ID is stored in the user_id column, and the activity ID is stored in activity_id
3. 

# Remaining User Stories in Trello Backlog

# Known Issues (In README or GitHub Issues)











