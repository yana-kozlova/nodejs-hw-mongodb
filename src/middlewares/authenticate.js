import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, "Authorization token missing in cookies");
    }

    const session = await findSession({ refreshToken });

    if (!session) {
      throw createHttpError(401, "Session not found");
    }

    if (Date.now() > session.refreshTokenValidUntil) {
      throw createHttpError(401, "Refresh token expired");
    }

    const user = await findUser({ _id: session.userId });
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    req.user = user;

    req.headers['Authorization'] = `Bearer ${refreshToken}`;

    next();
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    next(error);
  }
};
