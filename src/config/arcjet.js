import arcjet, { detectBot, protectSignup, shield, tokenBucket, validateEmail } from "@arcjet/next";


export const contactRules = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'],
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      email: (req) => req.body?.email || req.query?.email,  // Adjust as needed
    }),
    shield({
      mode: "LIVE",
      allow: [], // Specify allowed criteria if needed
    }),
    detectBot({
      mode: "LIVE",
      allow: [],  // No bots allowed
    }),
  ],
});