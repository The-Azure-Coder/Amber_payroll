const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let departments = `SELECT * FROM departments`;

  conn.query(departments, (err, rows) => {
    if (err) throw err;
    res.render("salary/summary", {
      layout: "layouts/supervisor-layout",
      departments: rows,
    });
    console.log(rows);
  });
});

router.post("/list", function (req, res, next) {
  var id = req.body.id;
  let sql = `SELECT 
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
WHERE dt.id LIKE '%${id}%';`;
  conn.query(sql, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.render("salary/summarylist", {
      salary: rows,
      layout: "layouts/supervisor-layout",
    });
  });
});
module.exports = router;
