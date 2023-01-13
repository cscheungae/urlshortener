import { Router } from "express";
import { getUrl, uploadUrl } from "./handler";
import { body } from "express-validator";
import { urlLookup, validateReqBody } from "./helper";

const router = Router();

router.get("/shorturl/:id", getUrl);
router.post(
    "/shorturl",
    body("url")
        .isURL({ protocols: ["http", "https"] })
        .custom(urlLookup),
    validateReqBody,
    uploadUrl
);

export default router;
