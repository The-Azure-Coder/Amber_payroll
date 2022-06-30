const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let employees = `SELECT et.first_nm, et.last_nm, dt.department_nm, et.nis, et.trn, et.expected_hrs FROM payroll.employees et JOIN payroll.departments dt ON dt.id = et.department_id`;
  conn.query(employees, (err, erows) => {
    if (err) throw err;
        res.render("employee/employee-list", {
          layout: "layouts/admin-layout",
          employees: erows,
        });
      });
    });

module.exports =router
