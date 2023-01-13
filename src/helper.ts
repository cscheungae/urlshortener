import { validationResult } from "express-validator";
import dns from "dns";

export const validateReqBody = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const isInValidUrl = errors.array().some((err) => err.param === "url");

        if (isInValidUrl) {
            return res.status(400).json({
                error: "invalid url",
            });
        }

        return res.status(400).json({
            errors: errors.array(),
        });
    }

    next();
};

export const urlLookup = async (value) => {
    const url = new URL(value);
    return await dns.promises.lookup(url.hostname);
};
