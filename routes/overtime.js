const express = require("express");
const router = express.Router();
const conn = require("../lib/database");

router.get("/", (req, res) => {
  let overtime = `SELECT 
    et.id AS emp_id,
    et.first_nm,
    et.last_nm,
    wt.hrs,
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
WHERE overtime !=0`;

  conn.query(overtime, (err, rows) => {
    if (err) throw err;
    res.render("salary/overtime", {
      layout: "layouts/admin-layout",
      overtime: rows,
    });
    console.log(rows);
  });
});

module.exports = router;
