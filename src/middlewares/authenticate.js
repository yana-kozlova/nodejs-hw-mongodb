import createHttpError from 'http-errors';

import { findSession, findUser, refreshUsersSession, setupSession } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, sessionId } = req.cookies;

    if (!accessToken) {
      let session = await findSession({ sessionId });

      if (!session) {
        throw createHttpError(401, 'Session not found');
      }

      if (!refreshToken || session.refreshToken !== refreshToken || Date.now() > session.refreshTokenValidUntil) {
        throw createHttpError(401, 'Invalid refresh token');
      }

      const newTokens = await refreshUsersSession({ sessionId, refreshToken });

      if (!newTokens) {
        throw createHttpError(401, 'Failed to refresh session');
      }

      setupSession(res, {
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        sessionId: newTokens.sessionId,
      });

      req.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
      req.user = { userId: newTokens.userId };

      return next(); // Завершаем middleware
    }

    const session = await findSession({ accessToken });
    if (!session || Date.now() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await findUser({ _id: session.userId });
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    req.headers['Authorization'] = `Bearer ${accessToken}`;
    next();
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    next(error);
  }
};
