const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let cycleQuery = `SELECT * FROM paycycle`;
  conn.query(cycleQuery, (err, cycleResult) => {
    if (err) throw err;
    res.render("employee/employee-salary", {
      layout: "layouts/employee-layout",
      paycycle: cycleResult,
    });
  });
});

router.post("/salary", (req, res) => {
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
    
    WHERE et.id LIKE  '%${req.session.emp_id}%' AND pt.id LIKE '%${req.body.cycle_id}%'`;
  conn.query(cycleResult, (err, cycleResult) => {
    if (err) throw err;
    res.render("employee/salary", {
      payinfo: cycleResult,
      layout: "layouts/employee-layout",
    });
  });
});

module.exports = router;
