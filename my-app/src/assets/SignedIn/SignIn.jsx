
function SignIn () {
  return (
        <main>
            <Link to="../"><img src="../images/sclogo1.png" alt="Slide Central Logo" class="nav-logo"/></Link>

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
        </main>
    );
}

export default SignIn;