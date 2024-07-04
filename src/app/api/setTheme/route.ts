import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { theme } = req.body;

      setCookie({ res }, "theme", theme, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      res.status(200).json({ message: "Theme cookie set" });
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
