const express = require("express");
const router = express.Router();
const conn = require('../lib/database')

router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/auth", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);

  conn.query(
    `SELECT * FROM payroll.logins WHERE email ='${email}' AND BINARY password='${password}'`,
    (err, rows) => {
      if (err) throw err;
      if (!err) {
        if (rows.length > 0) {
          req.session.loggedin = true;
          req.session.department_id = rows[0].deaprtment_id;
          req.session.role_id = rows[0].role_id;
          console.log(rows[0].role_id);
          console.log(rows[0].department_id);

          if (rows[0].role_id == 1) {
            res.redirect("/admin");
          } else if (rows[0].role_id == 2) {
            res.redirect("/supervise");
          } else if (rows[0].role_id == 3) {
            res.redirect("/accountant");
          }else if (rows[0].role_id == 4) {
            res.redirect("/employee");
          } else {
            res.redirect("/");
          }
        } else {
          req.session.loggedin = false;
          res.redirect("/");
        }
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
