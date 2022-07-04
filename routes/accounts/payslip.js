const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let employeeQuery = `SELECT * FROM employees`;
  conn.query(employeeQuery, (err, results) => {
    if (err) throw err;
    res.render("accounts/payslip-form", {
      layout: "layouts/accounts-layout",
      employees: results,
    });
  });
});

router.post("/pay", (req, res) => {
  let paygen = `SELECT 
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
    
    WHERE et.id LIKE '%${req.body.id}%' `;

  conn.query(paygen, (err, results) => {
    if (err) throw err;
    res.render("accounts/payslip", {
      payslip: results[0],
      layout: "layouts/accounts-layout",
    });
    console.log(results);
  });
});

module.exports = router;
