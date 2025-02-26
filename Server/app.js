const express = require('express');
const path = require('path');
const port = 8080;
const cors = require('cors');
const bcrypt = require('bcrypt');

const indexRouter = require('./routes');
const apiRouter = require('./routes/api');

const app = express();
const db = require('./config/db');

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączono z bazą danych MySQL.');
  }
});

app.get('/album', (req, res) => {
  const query = 'SELECT album.id,\n' +
      '    album.name AS album_name,\n' +
      '    album.release_date,\n' +
      '    album.picture_link,\n' +
      '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
      '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
      '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country\n' +
      'FROM\n' +
      '    album\n' +
      'LEFT JOIN\n' +
      '    album_artist aa ON album.id = aa.album_id\n' +
      'LEFT JOIN\n' +
      '    artist a ON aa.artist_id = a.id\n' +
      'LEFT JOIN\n' +
      '    album_genre ag ON ag.album_id = album.id\n' +
      'LEFT JOIN\n' +
      '    genre g ON ag.genre_id = g.id\n' +
      'LEFT JOIN\n' +
      '    country c ON a.country_id = c.id\n' +
      'GROUP BY album.id;';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json('Błąd pobierania albumów');
    }else{
      res.status(200).json(results);
    }
  })
})

app.get('/topAlbums', (req, res) => {
  const query = 'SELECT\n' +
      '    album.id,\n' +
      '    album.name AS album_name,\n' +
      '    album.release_date,\n' +
      '    album.picture_link,\n' +
      '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
      '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
      '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country\n' +
      'FROM\n' +
      '    album\n' +
      'INNER join\n' +
      '        top_albums ta on album.id = ta.album_id\n' +
      'LEFT JOIN\n' +
      '    album_artist aa ON album.id = aa.album_id\n' +
      'LEFT JOIN\n' +
      '    artist a ON aa.artist_id = a.id\n' +
      'LEFT JOIN\n' +
      '    album_genre ag ON ag.album_id = album.id\n' +
      'LEFT JOIN\n' +
      '    genre g ON ag.genre_id = g.id\n' +
      'LEFT JOIN\n' +
      '    country c ON a.country_id = c.id\n' +
      'GROUP BY album.id;';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json('Błąd pobierania albumów');
    }else{
      res.status(200).json(results);
    }
  })
})

app.get('/album/:id', (req, res) => {
  const query = 'SELECT album.id,\n' +
      '    album.name AS album_name,\n' +
      '    album.release_date,\n' +
      '    album.picture_link,\n' +
      '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
      '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
      '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country\n' +
      'FROM\n' +
      '    album\n' +
      'LEFT JOIN\n' +
      '    album_artist aa ON album.id = aa.album_id\n' +
      'LEFT JOIN\n' +
      '    artist a ON aa.artist_id = a.id\n' +
      'LEFT JOIN\n' +
      '    album_genre ag ON ag.album_id = album.id\n' +
      'LEFT JOIN\n' +
      '    genre g ON ag.genre_id = g.id\n' +
      'LEFT JOIN\n' +
      '    country c ON a.country_id = c.id\n' +
      'WHERE album.id = ?\n' +
      'GROUP BY album.id;';
  const values = [req.params.id];
  db.query(query,values, (err, results) => {
    if (err) {
      res.status(400).json('Błąd przy pobieraniu albumu');
    }else{
      res.status(200).json(results);
    }
  })
})

app.get('/album/name/:name', (req, res) => {
  const query = 'SELECT\n' +
      '    album.id,\n' +
      '    album.name AS album_name,\n' +
      '    album.release_date,\n' +
      '    album.picture_link,\n' +
      '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
      '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
      '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country\n' +
      'FROM\n' +
      '    album\n' +
      'LEFT JOIN\n' +
      '    album_artist aa ON album.id = aa.album_id\n' +
      'LEFT JOIN\n' +
      '    artist a ON aa.artist_id = a.id\n' +
      'LEFT JOIN\n' +
      '    album_genre ag ON ag.album_id = album.id\n' +
      'LEFT JOIN\n' +
      '    genre g ON ag.genre_id = g.id\n' +
      'LEFT JOIN\n' +
      '    country c ON a.country_id = c.id\n' +
      'WHERE album.name like CONCAT(\'%\',?,\'%\')\n' +
      'GROUP BY album.id;';
  const values = [req.params.name];
  db.query(query,values, (err, results) => {
    if (err) {
      res.status(400).json('Błąd przy pobieraniu albumu');
    }else{
      res.status(200).json(results);
    }
  })
})

// app.get('/album/user/:id', (req, res) => {
//   const query = 'SELECT\n' +
//       '    album.id,\n' +
//       '    album.name AS album_name,\n' +
//       '    album.release_date,\n' +
//       '    album.picture_link,\n' +
//       '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
//       '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
//       '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country,\n' +
//       '    GROUP_CONCAT(DISTINCT ua.rating ORDER BY ua.rating SEPARATOR \', \') AS rating,\n' +
//       '    GROUP_CONCAT(DISTINCT ua.info ORDER BY ua.info SEPARATOR \', \') AS info\n' +
//       'FROM\n' +
//       '    album\n' +
//       'INNER JOIN\n' +
//       '        user_albums ua ON album.id = ua.album_id\n' +
//       'LEFT JOIN\n' +
//       '    album_artist aa ON album.id = aa.album_id\n' +
//       'LEFT JOIN\n' +
//       '    artist a ON aa.artist_id = a.id\n' +
//       'LEFT JOIN\n' +
//       '    album_genre ag ON ag.album_id = album.id\n' +
//       'LEFT JOIN\n' +
//       '    genre g ON ag.genre_id = g.id\n' +
//       'LEFT JOIN\n' +
//       '    country c ON a.country_id = c.id\n' +
//       'WHERE ua.user_id = ?\n' +
//       'GROUP BY album.id;';
//   const values = [req.params.id];
//   db.query(query,values, (err, results) => {
//     if (err) {
//       res.status(400).json('Błąd przy pobieraniu albumu');
//     }else{
//       res.status(200).json(results);
//     }
//   })
// })

app.post('/album/user/:id', (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  const passwordQuery = 'SELECT password FROM user WHERE id = ?';
  db.query(passwordQuery, [userId], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Błąd serwera podczas weryfikacji użytkownika');
    }

    if (results.length === 0) {
      return res.status(401).json('Nie znaleziono użytkownika');
    }

    const storedPassword = results[0].password;

    try {
      const isMatch = await bcrypt.compare(password, storedPassword);

      if (!isMatch) {
        return res.status(403).json('Nieprawidłowe hasło');
      }

      const query = 'SELECT\n' +
                '    album.id,\n' +
                '    album.name AS album_name,\n' +
                '    album.release_date,\n' +
                '    album.picture_link,\n' +
                '    GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR \', \') AS artist,\n' +
                '    GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR \', \') AS genre,\n' +
                '    GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR \', \') AS country,\n' +
                '    GROUP_CONCAT(DISTINCT ua.rating ORDER BY ua.rating SEPARATOR \', \') AS rating,\n' +
                '    GROUP_CONCAT(DISTINCT ua.info ORDER BY ua.info SEPARATOR \', \') AS info\n' +
                'FROM\n' +
                '    album\n' +
                'INNER JOIN\n' +
                '        user_albums ua ON album.id = ua.album_id\n' +
                'LEFT JOIN\n' +
                '    album_artist aa ON album.id = aa.album_id\n' +
                'LEFT JOIN\n' +
                '    artist a ON aa.artist_id = a.id\n' +
                'LEFT JOIN\n' +
                '    album_genre ag ON ag.album_id = album.id\n' +
                'LEFT JOIN\n' +
                '    genre g ON ag.genre_id = g.id\n' +
                'LEFT JOIN\n' +
                '    country c ON a.country_id = c.id\n' +
                'WHERE ua.user_id = ?\n' +
                'GROUP BY album.id;';
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).json('Błąd przy pobieraniu albumów');
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json('Błąd serwera');
    }
  });
});


// app.delete('/album/user/:userId/:albumId', (req, res) => {
//   const { userId, albumId } = req.params;
//   const query = 'DELETE FROM user_albums WHERE user_id = ? AND album_id = ?';
//   const values = [userId, albumId];
//   db.query(query, values, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Błąd przy usuwaniu albumu' });
//     } else {
//       res.status(200).json({ message: 'Album został usunięty' });
//     }
//   });
// });

app.delete('/album/user/:userId/:albumId', (req, res) => {
  const { userId, albumId } = req.params;
  const { password } = req.body;

  const passwordQuery = 'SELECT password FROM user WHERE id = ?';
  db.query(passwordQuery, [userId], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Błąd serwera przy weryfikacji użytkownika' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Nie znaleziono użytkownika' });
    }

    const storedPassword = results[0].password;

    try {
      const isMatch = await bcrypt.compare(password, storedPassword);

      if (!isMatch) {
        return res.status(403).json({ error: 'Nieprawidłowe hasło' });
      }

      const deleteQuery = 'DELETE FROM user_albums WHERE user_id = ? AND album_id = ?';
      db.query(deleteQuery, [userId, albumId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Błąd przy usuwaniu albumu' });
        }
        res.status(200).json({ message: 'Album został usunięty' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });
});



// app.put('/album/user/:userId/:albumId', (req, res) => {
//   const { userId, albumId } = req.params;
//   const { rating, info } = req.body;
//   const values = [rating, info, userId, albumId];
//   const query = 'UPDATE user_albums SET rating = ?, info = ? WHERE user_id = ? AND album_id = ?';
//   db.query(query, values, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Błąd przy edytowaniu albumu' });
//     } else {
//       res.status(200).json({ message: 'Album został zaktualizowany' });
//     }
//   });
// });

app.put('/album/user/:userId/:albumId', (req, res) => {
  const { userId, albumId } = req.params;
  const { rating, info, password } = req.body;

  const passwordQuery = 'SELECT password FROM user WHERE id = ?';
  db.query(passwordQuery, [userId], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Błąd serwera przy weryfikacji użytkownika' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Nie znaleziono użytkownika' });
    }

    const storedPassword = results[0].password;

    try {
      const isMatch = await bcrypt.compare(password, storedPassword);

      if (!isMatch) {
        return res.status(403).json({ error: 'Nieprawidłowe hasło' });
      }

      const updateQuery = 'UPDATE user_albums SET rating = ?, info = ? WHERE user_id = ? AND album_id = ?';
      db.query(updateQuery, [rating, info, userId, albumId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Błąd przy edytowaniu albumu' });
        }
        res.status(200).json({ message: 'Album został zaktualizowany' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });
});


app.post('/register', async (req, res) => {
  const { email, password} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user';
    const query = 'INSERT INTO user (email, password, role) VALUES (?, ?, ?)';
    const values = [email, hashedPassword, role];

    if(email.length === 0)
      return res.status();

    db.query(query, values, (err, results) => {
      if (err) {
        if (err.errno === 1062) {
          return res.status(409).json({ error: 'Użytkownik o podanym emailu już istnieje' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Błąd rejestracji' });
      }
      res.status(201).json({ id: results.insertId });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const query = 'SELECT id, role, password FROM user WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json('Błąd logowania');
    }

    if (results.length === 0) {
      return res.status(401).json('Nieprawidłowy email lub hasło');
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json('Nieprawidłowy email lub hasło');
      }
      console.log(isMatch);

      res.status(200).json({ id: user.id, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json('Błąd serwera');
    }
  });
});

app.post('/addAlbum', (req, res) => {
  let { password, userId, albumName, releaseDate, pictureLink, genres, artists, rating, info } = req.body;

  const passwordQuery = 'SELECT password FROM user WHERE id = ?';
  db.query(passwordQuery, [userId], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Błąd serwera przy weryfikacji użytkownika' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Nie znaleziono użytkownika' });
    }

    const storedPassword = results[0].password;

    try {
      const isMatch = await bcrypt.compare(password, storedPassword);

      if (!isMatch) {
        return res.status(403).json({ error: 'Nieprawidłowe hasło' });
      }

      const query = 'CALL AddAlbumToCollection(?, ?, ?, ?, ?, ?, ?, ?)';
      if(rating === '')
        rating = null
      const values = [userId, albumName, releaseDate, pictureLink, genres.join(','), artists.join(','), rating, info];

      db.query(query, values, (err, results) => {
        console.log(req.body)
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Błąd podczas dodawania albumu do kolekcji' });
        } else {
          res.status(200).json({ message: 'Album dodany do kolekcji', results });
        }
      })
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  })
});

app.get('/artists', (req, res) => {
  const query = 'SELECT artist.id,artist.name AS name, country.name AS country FROM artist LEFT JOIN country ON artist.country_id=country.id';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Błąd pobierania wykonawców' });
    } else {
      res.status(200).json(results);
    }
  });
});




app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

module.exports = app;


