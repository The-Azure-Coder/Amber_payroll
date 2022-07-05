const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let agrregate = `SELECT count(et.id) AS emp_count FROM payroll.employees et;
                   SELECT count(dt.id) AS dep_count FROM payroll.departments dt;
                   SELECT count(lt.id) AS log_count FROM payroll.logins lt;
                   SELECT sum(pt.final_salary) AS salary_sum FROM payroll.salary_payment pt;`;

  let employees = `SELECT et.first_nm, et.last_nm, dt.department_nm, et.nis, et.trn FROM payroll.employees et JOIN payroll.departments dt ON dt.id = et.department_id`;
  let departments = `SELECT * FROM departments`;
  let users = `SELECT et.first_nm, et.last_nm, lt.email, lt.password FROM  payroll.roles rt JOIN payroll.logins lt ON rt.id = lt.role_id JOIN payroll.employees et on et.id = lt.emp_id`;
  conn.query(employees, (err, erows) => {
    if (err) throw err;
    conn.query(agrregate, (err, arows) => {
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
            aggregate: arows,
          });
          console.log(arows);
        });
      });
    });
  });
});

module.exports = router;
