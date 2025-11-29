import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ OLD (WRONG):
    // req.body.userId = token_decode;

    // ✅ NEW (ONLY FIX):
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

/*import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login Again",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store ONLY the userId, not the full payload
    req.user = { id: decoded.id }; // ✅ FIXED

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;*/
