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

## Screenshots
<img width="454" alt="image" src="https://github.com/user-attachments/assets/f952e05b-dd2a-4530-8e2f-30e534422b86" />
<img width="454" alt="image" src="https://github.com/user-attachments/assets/8840d80c-f1e9-4f4c-8c00-6c0e284cfcc0" />
<img width="454" alt="image" src="https://github.com/user-attachments/assets/e514c861-947f-4026-91ef-69ba1493dca5" />
<img width="454" alt="image" src="https://github.com/user-attachments/assets/a751f579-6069-4114-b80f-28f5dd786732" />
<img width="454" alt="image" src="https://github.com/user-attachments/assets/9ddc9f30-d6dd-41dc-9745-4204db56c392" />
<img width="1907" alt="image" src="https://github.com/user-attachments/assets/540c6e54-aeb9-4148-8a53-1c8444f81627" />
<img width="1919" alt="image" src="https://github.com/user-attachments/assets/8e3cd104-9da9-42ea-9965-2b5093384d8c" />



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
