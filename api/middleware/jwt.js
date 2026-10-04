import createError from "../utils/createError.js";
import { jwtVerify } from "jose";
import { jwtSecret } from "../controllers/auth.controller.js";

export const verifyToken = async (req, res, next) => {
   const token = req.cookies.accessToken;
   if (!token) return next(createError(401, "You're not authorized!"));

   try {
      const { payload } = await jwtVerify(token, jwtSecret(), {
         algorithms: ["HS256"],
      });
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      req.isAdmin = payload.isAdmin === true;
      next();
   } catch {
      return next(createError(403, "Token is not valid!"));
   }
};

// must be used after verifyToken
export const verifyAdmin = (req, res, next) => {
   if (!req.isAdmin) {
      return next(createError(403, "Admin access required!"));
   }
   next();
};

// must be used after verifyToken
export const verifySeller = (req, res, next) => {
   if (!req.isSeller) {
      return next(createError(403, "Only service providers can do this!"));
   }
   next();
};
