const db = require('../config/db');
const User = require('../entities/user');

class UserService {
  static async create(name, phone, obs) {
    const query = 'INSERT INTO users (name, phone, obs) VALUES (?, ?, ?)';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [name, phone, obs], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      const newUser = new User(results.insertId, name, phone, obs);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, name, phone, obs) {
    const query = 'UPDATE users SET name = ?, phone = ?, obs = ? WHERE id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [name, phone, obs, id], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      if (results.affectedRows === 0) {
        throw new Error('User not found');
      }
      const updatedUser = new User(id, name, phone, obs);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      if (results.affectedRows === 0) {
        throw new Error('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      if (results.length === 0) {
        throw new Error('User not found');
      }
      const user = new User(results[0].id, results[0].name, results[0].phone, results[0].obs);
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async all() {
    const query = 'SELECT * FROM users';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      const users = results.map(row => new User(row.id, row.name, row.phone, row.obs));
      return users;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
