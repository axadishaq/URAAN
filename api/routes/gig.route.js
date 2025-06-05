import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";
import {
   createGig,
   deleteGig,
   getGig,
   getGigs,
   getGigsByCountry,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/creategig", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", verifyToken, getGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/country/:country", getGigsByCountry);

//admin routes
// router.put("/gigs/:id", verifyToken, verifyAdmin, updateGig);

router.delete("/:id", verifyToken, verifyAdmin, deleteGig);

export default router;
