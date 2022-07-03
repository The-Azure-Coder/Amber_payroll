var express = require("express");
const layout = require("express-ejs-layouts");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var flash = require("express-flash");

app.use(layout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(flash());
app.use(cookieParser());
app.use(
  session({
    secret: "secREt$#code$%3245",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120000000 },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/no-nav");

var adminRouter = require("./routes/admin/dashboard");
var loginRouter = require("./routes/login");
var employeeRouter = require("./routes/admin/employee");
var salaryRouter = require("./routes/admin/salary");
var overtimeRouter = require("./routes/admin/overtime");
var salaryInfoRouter = require("./routes/supervisor/salary-info");
var summaryRouter = require("./routes/supervisor/summary");
var paycycleRouter = require("./routes/supervisor/paycycle");

app.use("/", loginRouter);
app.use("/admin", adminRouter);
app.use("/employees", employeeRouter);
app.use("/salary", salaryRouter);
app.use("/overtime", overtimeRouter);
app.use("/overtime", overtimeRouter);
app.use("/salaryInfo", salaryInfoRouter);
app.use("/summary", summaryRouter);
app.use("/paycycle", paycycleRouter);

const port = process.env.PORT || 3700;
app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
