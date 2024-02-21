import React from 'react'
import './SignIn.css'
import '../Background.css'


export const SignIn = () => {
  return (
    <div>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="stylesheet" href="../background.css"/>
<link rel="stylesheet" href="SignIn.css"/>
<title>Sign in</title>
</head>
  
<body>
<a href="/"><img src="../images/sclogo1.png" alt="Slide Central Logo" class="nav-logo"/></a>

<div class="signincontainer">
    <div class="card">
        <div class="header">
            <h1>Are you using SlideCentral as a...</h1>
        </div>
        <div class="content">
            <div class="option">
                <img src="../images/teacher.webp" alt="Teacher"/>
                <a href="teacherside/teacherdashboard.html"><h3>Teacher / Coach / Sponsor</h3></a>
            </div>
            <div class="option">
                <img src="../images/student.jpeg" alt="Student"/>
                <a href="studentside/studentdashboard.html"><h3>Student / Club Leader</h3></a>
            </div>
        </div>
    </div>
</div>
</body>


    </div>
  )
}
