import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
   const token = req.cookies.accessToken;
   if (!token) return next(createError(401, "You're not authorized!"));

   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      req.isAdmin = payload.isAdmin;
      next();
   });
};
export const verifyAdmin = (req, res, next) => {
   if (!req.userId === process.env.ADMIN_ID) {
      return next(createError(403, "Admin access required!"));
   }
   next();
};
