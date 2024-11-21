import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      throw createHttpError(401, "Authorization header missing");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer") {
      throw createHttpError(401, "Authorization header must be Bearer type");
    }

    const session = await findSession({ accessToken: token });
    if (!session) {
      throw createHttpError(401, "Session not found");
    }

    if (Date.now() > session.accessTokenValidUntil) {
      throw createHttpError(401, "Access token expired");
    }

    const user = await findUser({ _id: session.userId });
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    next(error);
  }
};