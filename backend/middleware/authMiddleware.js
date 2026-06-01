import jwt, { decode } from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("No Token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

export default authMiddleware;
