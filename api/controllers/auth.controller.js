import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import createError from "../utils/createError.js";
import { escapeRegex, userIsAdmin } from "../utils/helpers.js";

// HS256 secret for signing login tokens
export const jwtSecret = () => new TextEncoder().encode(process.env.JWT_KEY);

const isProduction = process.env.NODE_ENV === "production";

// In production the frontend (Vercel) and API live on different sites, so the
// cookie must be SameSite=None + Secure. Locally (http://localhost) Lax works.
const cookieOptions = {
   httpOnly: true,
   sameSite: isProduction ? "none" : "lax",
   secure: isProduction,
};

export const register = async (req, res, next) => {
   try {
      const { username, email, password, country, img, phone, desc, isSeller } =
         req.body;

      if (!username?.trim() || !email?.trim() || !password || !country?.trim())
         return next(
            createError(400, "Username, email, password and city are required!")
         );
      if (password.length < 8)
         return next(
            createError(400, "Password must be at least 8 characters!")
         );

      const existing = await User.findOne({
         $or: [
            { username: username.trim() },
            {
               email: {
                  $regex: `^${escapeRegex(email.trim())}$`,
                  $options: "i",
               },
            },
         ],
      });
      if (existing)
         return next(
            createError(
               409,
               existing.username === username.trim()
                  ? "Username is already taken!"
                  : "An account with this email already exists!"
            )
         );

      const hash = bcrypt.hashSync(password, 10);
      // Only whitelisted fields are saved, so nobody can register as admin.
      const newUser = new User({
         username: username.trim(),
         email,
         password: hash,
         country,
         img,
         phone,
         desc,
         isSeller: Boolean(isSeller),
      });

      await newUser.save();
      res.status(201).send({ message: "User has been added!" });
   } catch (err) {
      next(err);
   }
};

export const login = async (req, res, next) => {
   try {
      const { username, password } = req.body;
      if (!username || !password)
         return next(createError(400, "Username and password are required!"));

      const user = await User.findOne({ username: username.trim() });
      if (!user) return next(createError(404, "User Not Found!"));

      const isCorrect = bcrypt.compareSync(password, user.password);
      if (!isCorrect)
         return next(createError(400, "Wrong Password or Username!"));

      const isAdmin = userIsAdmin(user);
      const token = await new SignJWT({
         id: user._id.toString(),
         isSeller: user.isSeller,
         isAdmin,
      })
         .setProtectedHeader({ alg: "HS256" })
         .setIssuedAt()
         .setExpirationTime("7d")
         .sign(jwtSecret());

      const { password: _password, ...info } = user._doc;
      res.cookie("accessToken", token, {
         ...cookieOptions,
         maxAge: 7 * 24 * 60 * 60 * 1000,
      })
         .status(200)
         .send({ ...info, isAdmin });
   } catch (err) {
      next(err);
   }
};

export const logout = async (req, res) => {
   res.clearCookie("accessToken", cookieOptions)
      .status(200)
      .send({ message: "User has been logged out!" });
};
