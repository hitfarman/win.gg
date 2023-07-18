import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

const generateUniqueId = () => {
  const randomBytes = Math.random().toString(36).slice(2);
  const timestamp = Date.now().toString(36);
  const hash = createHash("sha256")
    .update(randomBytes + timestamp)
    .digest("hex");
  return hash.slice(0, 9);
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<{ cookie: string }>
) => {
  const cookieValue = generateUniqueId();

  const cookieOptions = [
    `react_id=${cookieValue}`,
    `HttpOnly`,
    `Secure`,
    `Max-Age=${60 * 60 * 24 * 365}`
  ];
  const cookieHeader = cookieOptions.join("; ");

  // Check if the cookie already exists
  if (req.cookies && req.cookies.react_id) {
    return res.status(200).json({ cookie: req.cookies.react_id });
  }

  // Set the cookie and return 201
  return res
    .setHeader("Set-Cookie", cookieHeader)
    .status(201)
    .json({ cookie: cookieValue });
};

export default handler;
