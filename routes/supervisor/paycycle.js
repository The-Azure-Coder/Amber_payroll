const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const conn = require("../../lib/database");

router.get("/", (req, res) => {
  let cycle = `SELECT * FROM paycycle`;
  conn.query(cycle, (err, results) => {
    if (err) throw err;
    res.render("paycycle/add-paycycle", {
      layout: "layouts/supervisor-layout",
      cycles: results,
    });
  });
});

router.post("/add", (req, res) => {
  let cycleData = {
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  let cycleQuery = `INSERT INTO paycycle SET ?`;

  conn.query(cycleQuery, cycleData, (err, result) => {
    if (err) throw err;
    res.redirect("/paycycle");
  });
});

router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  let editQuery = `SELECT * FROM paycycle WHERE id = ${id}`;

  conn.query(editQuery, (err, rows) => {
    if (err) throw err;
    res.render("paycycle/edit-paycycle", {
      layout: "layouts/supervisor-layout",
      cycle: rows[0],
    });
  });
});

router.post("/update", (req, res) => {
  let updateCycle = `update paycycle SET start_time='${req.body.start_time}', end_time='${req.body.end_time}' where id =${req.body.id}`;
  conn.query(updateCycle, (err, rows) => {
    if (err) throw err;
    res.redirect("/paycycle");
  });
});
module.exports = router;
