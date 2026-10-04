import mongoose from "mongoose";

// Escape user input before putting it inside a RegExp so characters like
// "(" or "*" can't break the query or be used for ReDoS.
export const escapeRegex = (text = "") =>
   String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Read the admin flag the same way everywhere: a user is admin if the flag is
// set on the document, or if their id matches ADMIN_ID from .env.
export const userIsAdmin = (user) =>
   Boolean(
      user &&
         (user.isAdmin ||
            (process.env.ADMIN_ID &&
               user._id.toString() === process.env.ADMIN_ID.trim()))
   );
