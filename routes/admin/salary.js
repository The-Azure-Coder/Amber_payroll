const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let salary = `SELECT 
  et.id AS emp_id,
  et.first_nm,
  et.last_nm,
  dt.id AS depart_id,
  dt.department_nm,
  pt.id AS cycle_id,
  pt.start_time,
  pt.end_time,
  pt.activity,
  wt.hrs,
  wt.overtime_hrs,
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
  payroll.paycycle pt on pt.id = st.paycycle_id`;

  conn.query(salary, (err, rows) => {
    res.render("salary/salary-list", {
      layout: "layouts/admin-layout",
      salary: rows,
    });
  });
});

module.exports = router;
