const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// ใช้ body-parser เพื่อแปลงข้อมูลจากฟอร์ม
app.use(bodyParser.urlencoded({ extended: true }));

// ใช้ Static File จากโฟลเดอร์ "public"
app.use(express.static('public'));


// เสิร์ฟไฟล์ HTML สำหรับการคำนวณผลบวก
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// คำนวณผลบวก
app.post("/", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const result = num1 + num2;

  res.send("The Result is = " + result);
});

// เสิร์ฟไฟล์ HTML สำหรับ BMI Calculator
app.get("/bmiCalculator", (req, res) => {
  res.sendFile(__dirname + "/public/bmiCalculator.html");
});

// คำนวณ BMI
app.post("/bmiCalculator", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.send("กรุณากรอกน้ำหนักและส่วนสูงให้ถูกต้อง");
  }

  const bmi = weight / (height * height);
  let description = "";

  if (bmi < 18.5) {
    description = "น้ำหนักน้อยเกินไป";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    description = "น้ำหนักปกติ";
  } else if (bmi >= 25 && bmi < 29.9) {
    description = "น้ำหนักเกิน";
  } else {
    description = "อ้วน";
  }

  res.send(`คุณมีค่า BMI = ${bmi.toFixed(2)}, คุณอยู่ในเกณฑ์ = ${description}`);
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});
