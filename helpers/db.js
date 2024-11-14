const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.message);
  } else {
    console.log('Połączono z bazą danych SQLite.');
  }
});

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = { query };
