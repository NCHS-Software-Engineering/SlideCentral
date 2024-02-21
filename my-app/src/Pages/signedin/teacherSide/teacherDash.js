import React from 'react'

export const teacherDash = () => {
  return (
    <div>
        <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Teacher Dashboard</title>
    <link rel="stylesheet" href="../dashStyles.css.css"/>
    <link rel="stylesheet" href="../../background.css"/>
    </head>

<body>
<header>
  <nav>
    <ul>
      <li><a href="../../index.html"><img src="../../images/sclogo1.png" alt="Slide Central Logo" class="nav-logo"/></a></li>

      <li><a href="teacherdashboard.html" class="wordlinks">Teacher Dashboard</a></li>
    </ul>
  </nav>
</header>

<main>
  <div class="tabs-1">
    <div class="sponsored-activities">
      <h1>Sponsored Activities:</h1>
      <p>- no current sponsored activities</p>
      <button>Add Activity?</button>
    </div>
  </div>
</main>


</body>
    </div>
  )
}
