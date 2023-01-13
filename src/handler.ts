import { dbPool } from "./dbPool";
import { Request, Response } from "express";
import { isEmpty } from "lodash";

export const getUrl = async (req, res) => {
    // from the req.params.id find the original url and redirect
    // if not found, return "error": "No short URL found for the given input"

    const { rows } = await dbPool.query(
        `
            SELECT url
            FROM link
            WHERE id = $1
        `,
        [req.params.id]
    );

    if (isEmpty(rows)) {
        res.status(200);
        res.json({ error: "No short URL found for the given input" });
        return;
    }

    const originalUrl = rows[0].url;
    res.redirect(originalUrl);
};

interface uploadUrlRequest extends Request {
    body: { url: string };
}

export const uploadUrl = async (req: uploadUrlRequest, res) => {
    const { rows: inserted } = await dbPool.query(
        `
            INSERT INTO link (url)
            VALUES($1)
            ON CONFLICT DO NOTHING
            RETURNING id
    `,
        [req.body.url]
    );

    if (!isEmpty(inserted)) {
        res.status(200);
        res.json({ original_url: req.body.url, short_url: inserted[0].id });
        return;
    }

    const { rows: retrieved } = await dbPool.query(
        `
            SELECT id
            FROM link
            WHERE url = $1
        `,
        [req.body.url]
    );
    if (!isEmpty(retrieved)) {
        res.status(200);
        return res.json({ original_url: req.body.url, short_url: retrieved[0].id });
    }

    return res.status(500).json({ message: "server error" });
};
