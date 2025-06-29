const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ adminId: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, admin: { email: admin.email, id: admin._id } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
