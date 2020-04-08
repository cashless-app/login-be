const connection = require("../configs/db");

module.exports = {
  checkEmail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT email FROM user WHERE id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  detailAdmin: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT a.*, b.name, b.email
            FROM admin a, user b
            WHERE a.user_id = '${id}' AND b.id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  detailUsers: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT a.*, b.name, b.email
            FROM users a, user b
            WHERE a.user_id = '${id}' AND b.id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  storeProfile: (email, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${email} SET ?`, data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  updateProfile: (role, data) => {
    let query =
      "UPDATE  admin  SET  province = ?, province_name = ?, city = ?, city_name = ?, kecamatan = ?, address = ?, postal_code = ?, phone = ? WHERE user_id = ?";
    if (role === "seller") {
      query =
        "UPDATE  users  SET  name_of_store = ?, address1 = ?, province1 = ?, province1_name = ?, city1 = ?, city1_name = ?, kecamatan1 = ?, postal_code1 = ?, address2 = ?, province2 = ?, province2_name = ?, city2 = ?, city2_name = ?, kecamatan2 = ?, postal_code2 = ?, phone = ? WHERE user_id = ?";
    }
    return new Promise((resolve, reject) => {
      connection.query(query, data, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  updateName: (user_id, name) => {
    let query = `UPDATE  user  SET  name = '${name}' WHERE id = ${user_id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  deleteAdmin: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM admin WHERE user_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  deleteUsers: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM users WHERE user_id = '${id}'`,
        (error, result) => {
          if (error) {
            reject(new Error(error));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  uploadAdmin: (filename, id) => {
    let query = `UPDATE admin SET photo = '${filename}' WHERE user_id = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
  uploadUsers: (filename, id) => {
    let query = `UPDATE users SET photo_profile = '${filename}' WHERE user_id = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  },
};
