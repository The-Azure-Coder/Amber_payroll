const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let employeeQuery = `SELECT * FROM employees`;
  let cycleQuery = `SELECT * FROM paycycle`;
  conn.query(employeeQuery, (err, empResult) => {
    if (err) throw err;
    conn.query(cycleQuery, (err, cycleResult) => {
      if (err) throw err;
      res.render("accounts/cycle-search", {
        layout: "layouts/accounts-layout",
        employees: empResult,
        paycycle: cycleResult,
      });
    });
  });
});

router.post("/list", (req, res) => {
  let aggregate = `SELECT 
  MAX(st.final_salary)AS max_salary,
  SUM(wt.hrs) AS total_workhrs,
  AVG(st.final_salary)AS salary_avg,
  SUM(st.final_salary)AS total_salary
FROM
  payroll.employees et
JOIN
   payroll.departments dt on dt.id = et.department_id
JOIN
   payroll.work_hours wt on et.id = wt.emp_id
JOIN
   payroll.salary_payment st on st.workhrs_id = wt.id
JOIN
  payroll.paycycle pt on pt.id = st.paycycle_id
  
  WHERE et.id LIKE  '%${req.body.emp_id}%' AND pt.id LIKE '%${req.body.cycle_id}%'
  `;
  let cycleResult = `SELECT 
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
  st.id AS salary_id,
  st.salary,
  st.overtime,
  st.final_salary
FROM
  payroll.employees et
JOIN
   payroll.departments dt on dt.id = et.department_id
JOIN
   payroll.work_hours wt on et.id = wt.emp_id
JOIN
   payroll.salary_payment st on st.workhrs_id = wt.id
JOIN
  payroll.paycycle pt on pt.id = st.paycycle_id
  
  WHERE et.id LIKE  '%${req.body.emp_id}%' AND pt.id LIKE '%${req.body.cycle_id}%'`;
  conn.query(cycleResult, (err, cycleResult) => {
    if (err) throw err;
    conn.query(aggregate, (err, aggResult) => {
      if (err) throw err;
      res.render("accounts/cycle-results", {
        payinfo: cycleResult,
        aggregate: aggResult[0],
        layout: "layouts/accounts-layout",
      });
    });
  });
});

module.exports = router;
