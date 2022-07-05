const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let absents = `SELECT 
    et.id AS emp_id,
    et.first_nm,
    et.last_nm,
    dt.id AS depart_id,
    dt.department_nm,
    pt.id AS cycle_id,
    pt.start_time,
    pt.end_time,
    pt.activity,
    wt.id AS work_id,
    wt.hrs,
    wt.overtime_hrs,
    st.id AS salary_id,
    st.salary,
    st.overtime,
    st.final_salary,
    ab.absent_date
  FROM
    payroll.employees et
  JOIN
  payroll.absent ab on et.id = ab.emp_id
  join
     payroll.departments dt on dt.id = et.department_id
  JOIN
     payroll.work_hours wt on et.id = wt.emp_id
  JOIN
     payroll.salary_payment st on st.workhrs_id = wt.id
  JOIN
    payroll.paycycle pt on pt.id = st.paycycle_id
    `;
  let employees = `SELECT * FROM employees`;
  conn.query(absents, (err, abresults) => {
    if (err) throw err;
    conn.query(employees, (err, empresults) => {
      if (err) throw err;
      res.render("employee/absent-days", {
        layout: "layouts/supervisor-layout",
        employees: empresults,
        absents: abresults,
      });
    });
  });
});

router.post("/add", (req, res) => {
  let absentData = {
    emp_id: req.body.emp_id,
    absent_date: req.body.absent_date,
  };

  let absentQuery = `INSERT INTO absent SET ?`;

  conn.query(absentQuery, absentData, (err, result) => {
    if (err) throw err;
    res.redirect("/preview");
  });
});

module.exports = router;
