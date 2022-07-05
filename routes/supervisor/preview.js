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
  payroll.paycycle pt on pt.id = st.paycycle_id`;

  conn.query(salary, (err, rows) => {
    if (err) throw err;
    res.render("salary/salary-preview", {
      layout: "layouts/supervisor-layout",
      salary: rows,
    });
  });
});

router.get("/edit/:salary_id", (req, res) => {
  let salId = req.params.salary_id;
  let departments = `SELECT * FROM departments`;
  let paycycle = `SELECT * FROM paycycle`;

  let salaryEdit = `SELECT 
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
    
    WHERE st.id =${salId}`;

  conn.query(salaryEdit, (err, srows) => {
    if (err) throw err;
    conn.query(departments, (err, drows) => {
      if (err) throw err;
      conn.query(paycycle, (err, prows) => {
        if (err) throw err;
        res.render("salary/edit-salary", {
          layout: "layouts/supervisor-layout",
          salary: srows[0],
          departments: drows,
          paycycle: prows,
        });
      });
    });
  });
});

router.post("/update", (req, res) => {
  let updatehrs = `update work_hours SET  hrs='${req.body.hrs}', overtime_hrs='${req.body.overtime_hrs}' where id =${req.body.work_id}`;
  conn.query(updatehrs, (err, hrsRows) => {
    if (err) throw err;
    res.redirect("/preview");
  });
});

module.exports = router;
