const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // For single admin, we can just attach the admin email
      if (decoded.email !== process.env.ADMIN_EMAIL) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.admin = { email: decoded.email };
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;
