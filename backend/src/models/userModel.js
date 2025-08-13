import db from "../config/db.js";

export const countUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS count FROM users", (err, results) => {
      if (err) reject(err);
      else resolve(results[0].count);
    });
  });
};

export const createUser = (mobile_number, password, language) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (mobile_number, password, language) VALUES (?, ?, ?)",
      [mobile_number, password, language],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

export const findUserByMobile = (mobile_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE mobile_number = ?",
      [mobile_number],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
};
