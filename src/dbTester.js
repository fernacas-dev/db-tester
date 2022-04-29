
import mysql from "mysql2";

export default class DbTester{

    constructor(connectionConfig){
      this.connection = mysql.createConnection(connectionConfig);
    }

    connectToDatabase = () => {
      return new Promise((resolve, reject) => {
        this.connection?.connect((err) => {
          if (err) {
            return reject(err.message)
          }
          return resolve('Connection successful');
        })
      });
    };

    closeConnection = () => {
      return  new Promise((resolve, reject) => {
        this.connection?.end(function(err) {
          if (err) {
            return reject(err.message);
          }
          return resolve('Connection closed');
        });
      });
    };

    runQuery = (sqlQuery) => {
      return new Promise((resolve, reject) => {
        this.connection?.query(sqlQuery, (error, results, fields) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(results);
        });
      });
    };
}
