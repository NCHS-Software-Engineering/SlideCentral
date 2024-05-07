const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
app.use(cors());

const db = mysql.createConnection({
  host: "db.redhawks.us",
  user: "redhawks_slide",
  password: "VAA0W5lMTgdn9LL",
  database: "redhawks_slide"
});

db.connect((err) => {
  if(err) throw err;
  console.log('Connected to database');
});

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json()); // Add this line to parse JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// EXPRESS SESSION STUFF ---------------------------------------------------

// Session middleware
app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: true
}));

//-------------------------------------------------------------------------


app.post('/api/save', (req, res) => {
  const sub = req.body.sub; //user ID
  const sub2 = req.body.sub2; //Username
  const sub3 = req.body.sub3; //is_teacher
  const sub4 = req.body.sub4; //email
  
  const sqlInsert = "INSERT INTO user_matrix (user_id, user_name, is_teacher, email) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE user_name = VALUES(user_name), is_teacher = VALUES(is_teacher), email = VALUES(email)";
  
  db.query(sqlInsert, [sub, sub2, sub3, sub4], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error saving to database.');
      } else {
          res.send('Data saved successfully.');
      }
  });
});

app.post('/login', async (req, res) => {
  try {
    const { userId } = req.body;
    // Check if the user already exists in the sessions table
    db.query('SELECT * FROM sessions WHERE user_id = ?', [userId], async (err, results) => {
      if (err) {
        console.error('Login error:', err);
        res.status(500).send('Error logging in');
      } else if (results.length > 0) {
        // User already has a session, retrieve their session key
        const sessionKey = results[0].session_key;
        // Set the session key as a cookie
        req.session.sessionKey = sessionKey;
        //localStorage.setItem('sessionKey', sessionKey);
        
        res.send({sessionKey: sessionKey, message: 'Logged in successfully'});
      } else {
        // User doesn't have a session yet, generate a new session key
        const sessionKey = crypto.randomBytes(64).toString('hex');
        // Store the session key in the database
        db.query('INSERT INTO sessions (user_id, session_key) VALUES (?, ?)', [userId, sessionKey], (err, insertResults) => {
          if (err) {
            console.error('Session key insertion error:', err);
            res.status(500).send('Error inserting session key');
          } else {
            // Set the session key as a cookie
            req.session.sessionKey = sessionKey;
  
            //localStorage.setItem('sessionKey', sessionKey);
            res.send({sessionKey: sessionKey, message: 'Logged in successfully'});
          }
        });
      }
      
      //console.log('SessionKey stored:', localStorage.getItem('sessionKey'));
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error logging in');
  }
});


app.post('/api/activities', (req, res) => {
  const { activities } = req.body;
  activities.forEach(activity => {
    const sqlInsert = "INSERT INTO user_matrix (activities_list) VALUES (?) ON DUPLICATE KEY UPDATE activities_list = VALUES(activities_list)";
    db.query(sqlInsert, [activity], (err, result) => {
      if (err) {
        console.error(err); 
        res.status(500).send('Error saving to database.');
      }
    });
  });
});

app.get('/getID/:activityName', (req, res) => {
  const activityName = req.params.activityName;
  const sqlSelect = "SELECT activity_id FROM activity_matrix WHERE activity_name = ?";
  db.query(sqlSelect, [activityName], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching activity ID.');
    } else {
      res.json(result);
    }
  });
});




app.post('/api/sponsor', (req, res) => {
  const sub4 = req.body.sub4;
  const sub5 = req.body.sub5;
  const sqlInsert = "INSERT INTO activity_sponsor (activity_id, user_id) VALUES (?, ?)";
  db.query(sqlInsert, [sub4, sub5,], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error saving to database.');
    } else {
        res.send('Data saved successfully.');
    }
});
});

app.post('/api/activ', (req, res) => {
  const sub6 = req.body.sub6;
  const sub7 = req.body.sub7;
  const sqlInsert = "INSERT INTO activity_matrix (activity_id, activity_name) VALUES (?, ?)";
  db.query(sqlInsert, [sub6, sub7,], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error saving to database.');
    } else {
        res.send('Data saved successfully.');
    }
});
});

app.post('/api/slide', (req, res) => {
  const id = req.body.sub1;
  const name = req.body.sub2;
  const description = req.body.sub3;
  const date = req.body.sub4;
  const activityID = req.body.sub5;
  const image1Path = req.body.sub6;
  const image2Path = req.body.sub7;
  const background = req.body.sub8;
  const textColor = req.body.sub9;

  const sqlInsert = "INSERT INTO slide_matrix (slide_id, title, description, meeting_date, activity_id, image1,image2, background_color, text_color) VALUES (?, ?, ?, ?, ?,?,?,?,?  )";
  
  db.query(sqlInsert, [id,name,description,date,activityID,image1Path,image2Path,background,textColor], (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error saving to database.');
    } else {
        res.send('Data saved successfully.');
    }
});
});

app.delete('/activ/:activityID', (req, res) => {
  const activityID = req.params.activityID;
  const sqlDelete = "DELETE FROM activity_matrix WHERE activity_id = ?";
  db.query(sqlDelete, [activityID], (err, result) => {    if (err) {
      console.error(err);
      res.status(500).send('Error deleting activity.');
    } else {
      res.send('Activity deleted successfully.');
    }
  });
});

app.delete('/sponsor/:activityID', (req, res) => {
  const activityID = req.params.activityID;
  const sqlDelete = "DELETE FROM activity_sponsor WHERE activity_id = ?";
  db.query(sqlDelete, [activityID], (err, result) => {    if (err) {
      console.error(err);
      res.status(500).send('Error deleting activity.');
    } else {
      res.send('Activity deleted successfully.');
    }
  });
});

app.delete('/sponsor2/', (req, res) => {
  const activityID = req.query.activityId;
  const userId = req.query.userId;
  const sqlDelete = "DELETE FROM activity_sponsor WHERE activity_id = ? AND user_id = ?";
  db.query(sqlDelete, [activityID, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting activity.');
    } else {
      res.send('Activity deleted successfully.');
    }
  });
});

app.get('/imageTemplate', (req, res) => {
  const sqlSelect = "SELECT image1 FROM slide_matrix";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching images.');
    } else {
      const images = result.map(row => row.image1);
      res.json(images);
    }
  });
});

app.get('/imageTemplate:activityID', (req, res) => {
  const activityID = req.params.activityID;
  console.log("server id:" + activityID)
  const sqlSelect = "SELECT image1 FROM slide_matrix WHERE activity_id = ?";
  db.query(sqlSelect, [activityID], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching images.');
    } else {
      const images = result.map(row => row.image1);
      res.json(images);
      console.log(images);
    }
  });
});

app.get('/numSlides:activityID', (req, res) => {
  const activityID = req.params.activityID;
  
  const sqlSelect = "SELECT COUNT(*) AS numSlides FROM slide_matrix WHERE activity_id = ?";
  db.query(sqlSelect, [activityID], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching number of slides.');
    } else {
      const numSlides = result[0] ? result[0].numSlides : 0;
      res.json({ numSlides });
    }
  });
});

app.get('/sponsor/:userId', (req, res) => {
  const userId = req.params.userId;
  const sqlSelect = "SELECT activity_sponsor.activity_id, activity_name FROM activity_sponsor JOIN activity_matrix ON activity_sponsor.activity_id = activity_matrix.activity_id WHERE user_id = ?";
  db.query(sqlSelect, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching activities.');
    } else {
      const activityIds = result.map(activity => activity.activity_id);
      const activityNames = result.map(activity => activity.activity_name);
      res.json({ activityIds, activityNames });
    }
  });
});

app.get('/user_matrix/:email', (req, res) => {
  const email = req.params.email;
  const sqlSelect = "SELECT user_id FROM user_matrix WHERE email = ?";
  db.query(sqlSelect, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching userID.');
    } else {
      res.json(result);
      }
  });
});

app.post('/api/sponsor', (req, res) => {
  const user_id = req.body.sub;
  const activity_id = req.body.sub2;
  const sqlInsert = "INSERT INTO activity_sponsor (user_id, activity_id) VALUES (?, ?)";
  db.query(sqlInsert, [user_id, activity_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving to database.');
    } else {
      res.send('Data saved successfully.');
    }
  });
});


// Set up Multer storage
const storage = multer.memoryStorage(); // Using memory storage as we'll process the file before saving
const upload = multer({ storage: storage });

// Middleware function to resize image to 16:9 aspect ratio
function resizeTo16x9(req, res, next) {
  if (!req.file) {
    return next();
  }

  // Resize image to 16:9 aspect ratio
  sharp(req.file.buffer)
    .resize({ width: 1920, height: 1080, fit: 'cover' })
    .toBuffer()
    .then(data => {
      req.file.buffer = data;
      next();
    })
    .catch(err => {
      next(err);
    });
}

// Function to count the number of image files in a directory
function countImagesInDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.filter(file => /\.(png|jpe?g|svg)$/i.test(file)).length;
}

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use upload middleware followed by resizing middleware
app.post('/upload', upload.single('image'), resizeTo16x9, (req, res) => {
  // At this point, req.file.buffer contains the resized image

  // Define the directory where the image will be saved
  const saveDir = path.join(__dirname, 'public', 'slides');

  // Count the number of images in the directory
  const imageCount = countImagesInDirectory(saveDir);

  // Generate a new filename based on the image count
  const newFilename = `slide${imageCount + 1}.png`; // Change the extension if needed

  // Define the full path where the image will be saved
  const savePath = path.join(saveDir, newFilename);

  // Write the image file to disk
  fs.writeFile(savePath, req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving file.');
    }

    res.send(savePath);
  });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));















// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});