const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let paycycle = `SELECT * FROM paycycle`;
  let departments = `SELECT * FROM departments`;
  conn.query(paycycle, (err, payRows) => {
    if (err) throw err;
    conn.query(departments, (err, dRows) => {
      if (err) throw err;
      res.render("salary/add-salary", {
        layout: "layouts/supervisor-layout",
        paycycle: payRows,
        departments: dRows,
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
              res.redirect("/salaryInfo");
            });
          }
        );
      }
    );
  });
});

module.exports = router;
