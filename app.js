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

var adminRouter = require("./routes/admin");
var loginRouter = require("./routes/login");
var employeeRouter = require("./routes/employee");
var salaryRouter = require("./routes/salary");
var overtimeRouter = require("./routes/overtime");

app.use("/", loginRouter);
app.use("/admin", adminRouter);
app.use("/employees", employeeRouter);
app.use("/salary", salaryRouter);
app.use("/overtime", overtimeRouter);

const port = process.env.PORT || 3700;
app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
