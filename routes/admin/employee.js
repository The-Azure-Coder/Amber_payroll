const express = require("express");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let employees = `SELECT et.id, lt.id as login_id, et.first_nm,et.last_nm, et.nis, et.trn, lt.email, lt.password, rt.id AS role_id, dt.id AS depart_id, dt.department_nm, rt.roles FROM payroll.employees et JOIN payroll.logins lt ON lt.emp_id = et.id JOIN payroll.departments dt ON lt.department_id = dt.id JOIN payroll.roles rt ON lt.role_id = rt.id`;
  conn.query(employees, (err, erows) => {
    if (err) throw err;
    res.render("employee/employee-list", {
      layout: "layouts/admin-layout",
      employees: erows,
    });
  });
});

router.get("/form", (req, res) => {
  let roles = `SELECT * FROM roles`;
  let departments = `SELECT * FROM departments`;
  let paycycle = `SELECT * FROM paycycle`;

  conn.query(roles, (err, rRows) => {
    if (err) throw err;
    conn.query(departments, (err, drows) => {
      if (err) throw err;
      conn.query(paycycle, (err, prows) => {
        if (err) throw err;
        res.render("employee/add-employee", {
          layout: "layouts/admin-layout",
          roles: rRows,
          departments: drows,
          paycycle: prows,
        });
      });
    });
  });
});

router.post("/add", (req, res) => {
  let employeeData = {
    department_id: req.body.department_id,
    first_nm: req.body.first_nm,
    last_nm: req.body.last_nm,
    nis: req.body.nis,
    trn: req.body.trn,
  };

  let employeeSql = `INSERT INTO employees SET ?`;
  conn.query(employeeSql, employeeData, (err, empRows) => {
    if (err) throw err;
    let loginData = {
      role_id: req.body.role_id,
      department_id: req.body.department_id,
      emp_id: empRows.insertId,
      email: req.body.email,
      password: req.body.password,
    };

    let loginsql = `INSERT INTO logins SET ?`;
    conn.query(loginsql, loginData, (err, logRows) => {
      if (err) throw err;
      res.redirect("/employees");
    });
  });
});

router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  let editSql = `SELECT et.id, lt.id as login_id, et.first_nm,et.last_nm, et.nis, et.trn, lt.email, lt.password, rt.id AS role_id, dt.id AS depart_id, dt.department_nm, rt.roles FROM payroll.employees et JOIN payroll.logins lt ON lt.emp_id = et.id JOIN payroll.departments dt ON lt.department_id = dt.id JOIN payroll.roles rt ON lt.role_id = rt.id WHERE et.id = ${id}`;
  let roles = `SELECT * FROM roles`;
  let departments = `SELECT * FROM departments`;
  conn.query(editSql, (err, edrows) => {
    if (err) throw err;
    conn.query(departments, (err, drows) => {
      if (err) throw err;
      conn.query(roles, (err, rows) => {
        if (err) throw err;
        res.render("employee/edit-employee", {
          layout: "layouts/admin-layout",
          edit: edrows[0],
          departments: drows,
          roles: rows,
        });
      });
    });
  });
});

router.post("/update", (req, res) => {
  let updateEmp = `update employees SET department_id='${req.body.department_id}', first_nm='${req.body.first_nm}', last_nm='${req.body.last_nm}', nis='${req.body.nis}', trn='${req.body.trn}' where id =${req.body.id}`;
  conn.query(updateEmp, (err, empRows) => {
    if (err) throw err;
    let bookingSql = `update logins SET role_id='${req.body.role_id}', department_id='${req.body.department_id}',  emp_id='${req.body.id}', email='${req.body.email}', password='${req.body.password}' where id =${req.body.login_id}`;
    conn.query(bookingSql, (err, logRows) => {
      if (err) throw err;
      res.redirect("/employees");
    });
  });
});

router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let deleteQuery = `DELETE FROM employees WHERE id =${id}`;
  conn.query(deleteQuery, (err, rows) => {
    if (err) throw err;
    res.redirect("/employees");
  });
});

module.exports = router;
