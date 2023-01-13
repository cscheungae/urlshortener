import { validationResult } from "express-validator";
import dns from "node:dns/promises";

export const validateReqBody = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const isInValidUrl = errors.array().some((err) => err.param === "url");

        return res.status(400).json({
            errors: errors.array(),
            error: isInValidUrl ? "invalid url" : undefined,
        });
    }

    next();
};

export const urlLookup = async (value) => {
    const url = new URL(value);
    return await dns.lookup(url.hostname);
};
