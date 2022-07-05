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
    res.render("accounts/salary-table", {
      layout: "layouts/accounts-layout",
      salary: rows,
    });
  });
});

router.get("/form", (req, res) => {
  let paycycle = `SELECT * FROM paycycle`;
  let departments = `SELECT * FROM departments`;
  let employees = `SELECT * FROM employees`;
  conn.query(paycycle, (err, payRows) => {
    if (err) throw err;
    conn.query(departments, (err, dRows) => {
      if (err) throw err;
      conn.query(employees, (err, eRows) => {
        if (err) throw err;
        res.render("accounts/add-salary", {
          layout: "layouts/accounts-layout",
          paycycle: payRows,
          departments: dRows,
          employees: eRows,
        });
      });
    });
  });
});
router.post("/add", (req, res) => {
  var overtime = 1.5;
  let hrsData = {
    emp_id: req.body.emp_id,
    hrs: req.body.hrs,
    paycycle_id: req.body.paycycle_id,
    overtime_hrs: req.body.overtime_hrs,
  };

  let hrsQuery = `INSERT INTO work_hours SET ?`;

  conn.query(hrsQuery, hrsData, (err, workResults) => {
    if (err) throw err;

    conn.query(
      `SELECT * FROM departments WHERE id =${req.body.depart_id}`,
      (err, departResults) => {
        if (err) throw err;

        conn.query(
          `SELECT * FROM work_hours WHERE emp_id=${req.body.emp_id}`,
          (err, workRows) => {
            if (err) throw err;
            let basicHrs = departResults[0].basic_hrs;
            let salaryCal = departResults[0].rates * basicHrs;
            if (workRows[0].hrs > 40) {
              overtimeCal =
                departResults[0].rates * overtime * workRows[0].overtime_hrs;
            } else {
              overtimeCal = 0;
            }

            let finalSal = overtimeCal + salaryCal;

            let salaryData = {
              emp_id: req.body.emp_id,
              department_id: req.body.depart_id,
              paycycle_id: req.body.paycycle_id,
              workhrs_id: workResults.insertId,
              salary: salaryCal,
              overtime: overtimeCal,
              final_salary: finalSal,
            };
            let salaryQuery = `INSERT INTO salary_payment SET ?`;
            conn.query(salaryQuery, salaryData, (err, salaryRows) => {
              if (err) throw err;
              res.redirect("/salarytable");
            });
          }
        );
      }
    );
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
        res.render("accounts/edit-salary", {
          layout: "layouts/accounts-layout",
          salary: srows[0],
          departments: drows,
          paycycle: prows,
        });
      });
    });
  });
});

router.post("/update", (req, res) => {
  let updatehrs = `update work_hours SET  hrs='${req.body.hrs}', paycycle_id='${req.body.paycycle_id}', overtime_hrs='${req.body.overtime_hrs}' where id =${req.body.work_id}`;
  conn.query(updatehrs, (err, hrsRows) => {
    if (err) throw err;
    let updatesalary = `update salary_payment SET department_id='${req.body.depart_id}', paycycle_id='${req.body.paycycle_id}', salary='${req.body.salary}', overtime='${req.body.overtime}', final_salary='${req.body.final_salary}' where id =${req.body.salary_id}`;
    conn.query(updatesalary, (err, sRows) => {
      if (err) throw err;
      res.redirect("/salarytable");
    });
  });
});

module.exports = router;
