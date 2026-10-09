import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
   createGig,
   deleteGig,
   getGig,
   getGigs,
   getGigsByCountry,
} from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/creategig", verifyToken, createGig);
// owner or admin (checked in the controller)
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/country/:country", getGigsByCountry);

export default router;
