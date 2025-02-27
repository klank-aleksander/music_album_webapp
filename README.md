# Music Albums WebApp

A web application for managing a personal music album collection, built with **React** (frontend) and **Express.js** (backend). The data is stored in an **Oracle SQL database**, running in a Docker container.  

## Features
- **Add Albums** – Users can add albums with details such as name, release date, cover image link, genre, artist, rating, and additional notes.
- **Database Storage** – All albums are stored in an Oracle SQL database.
- **Authentication** – Some features require user authentication (stored in cookies).
- **Album Search** – Find albums by name.
- **Album Collections**:
  - **Community Picks** – A selection of albums displayed on the home page.
  - **All Albums** – A full database listing.
  - **Your Albums** – Albums saved by the logged-in user.
  - **Artist List** – A list of all artists in the database.
- **Custom CSS** – The application has a unique design.

## Setup Instructions

### 1. Database Setup (Docker)
To run the database, start an Oracle SQL instance in Docker and execute the provided `CREATE` and `INSERT` scripts. A stored procedure must also be added for inserting albums.

### 2. Backend Configuration
In the `Server/config/db.js` file, update the database connection settings to match your docker configuration:  

```javascript
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'my_user',
    password: 'password',
    database: 'vinyl_db',
});

module.exports = db;
