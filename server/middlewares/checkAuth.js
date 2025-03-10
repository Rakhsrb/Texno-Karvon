import jwt from "jsonwebtoken";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export default function (req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!token) return sendErrorResponse(res, 409, "Access not allowed!");
  const { id } = jwt.verify(token, process.env.JWT_KEY);
  req.userInfo = { userId: id };
  next();
}
