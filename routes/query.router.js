import { Router } from "express";
import { postParameter } from "../controler/post.controller.js";

const router = Router();

router.post("/:parameter", postParameter);

export default router;
