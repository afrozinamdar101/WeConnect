import expressJwt from "express-jwt";

export const requireSignIn = expressJwt({
  secret: process.env.JST_SECRET,
  algorithm: ["HS256"],
});
