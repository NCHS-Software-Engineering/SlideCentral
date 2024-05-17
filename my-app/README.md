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
3. The sessions table stores a session_id with a user_id in order to check if the user is currently signed in, making it so you don't have to sign in every time you reload
4. The slide_matrix table stores all slide information. slide_id is an individual key that stores an integer date and time ID for a slide. The title of slides are stored in title, description is a paragaph element storing large amounts of text, meeting_date stores when the slide will expire, image1 and image2 stores an image path for the image a user will upload to a slide, template_num decides which template the user will use for their slide, activity_id links a slide to an activity ID, background_color and text_color store a hex value for the color that the user will be using in their slides.
5. Finally, user matrix stores a logged in user's Google generated unique User ID in user_id. Their status as either a teacher or student is saved in is_teacher, 1 meaning they have teacher permissions, and 0 if they are a student. user_name is the Google user's full name. Their gmail attatched to their google account is also saved in email.

# Remaining User Stories in Trello Backlog
- I want to be able to upload up to two images to be added to my slides
- I want to be able to enter simple information about my club or activity that will automatically generate slide templates for me
- I want to be able to approve or deny changes to slides requested by students I have invited to an activity

# Known Issues (In README or GitHub Issues)
- Currently you have to click the upload button twice to upload an image (an error occurs the first time)
- Image upload 2 doesn't work
- Slide Creation w/ form is not complete
- Many bugs with loading mini carousels











