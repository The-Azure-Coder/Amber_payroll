const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let employees = `SELECT et.first_nm, et.last_nm, dt.department_nm, et.nis, et.trn, et.expected_hrs FROM payroll.employees et JOIN payroll.departments dt ON dt.id = et.department_id`;
  let departments = `SELECT * FROM departments`;
  let users = `SELECT et.first_nm, et.last_nm, lt.email, lt.password FROM  payroll.roles rt JOIN payroll.logins lt ON rt.id = lt.role_id JOIN payroll.employees et on et.id = lt.emp_id`;
  conn.query(employees, (err, erows) => {
    if (err) throw err;
    conn.query(departments, (err, drows) => {
      if (err) throw err;
      conn.query(users, (err, urows) => {
        if (err) throw err;
        res.render("admin/dash", {
          layout: "layouts/admin-layout",
          employees: erows,
          departments: drows,
          users: urows,
        });
      });
    });
  });
});

module.exports = router;
