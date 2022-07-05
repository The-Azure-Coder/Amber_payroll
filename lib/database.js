var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root",
  database: "payroll",
  dateStrings: true,
  multipleStatements: true,
});

conn.connect((err) => {
  if (!err) console.log("Connected to the database Successfully");
  else
    console.log(
      "Fail to connect to the database" + JSON.stringify(err, undefined, 2)
    );
});

module.exports = conn;
