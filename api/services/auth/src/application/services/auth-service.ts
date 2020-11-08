import jwt from 'jsonwebtoken';

import { User } from '../../domain/user/user';
import { AllowedStatus } from "../../domain/user/status";

export interface AuthCredentials {
  accessToken: string;
  accessTokenExpiresInMilliseconds: number;
  refreshToken: string;
  refreshTokenExpiresInMilliseconds: number;
  status: AllowedStatus;
}

export class AuthService {
  private static readonly ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS = 900000;
  private static readonly REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS = 900000;

  public static createAuthCredentials(user: User): AuthCredentials {
    return {
      accessToken: AuthService.createAccessToken(user),
      accessTokenExpiresInMilliseconds: AuthService.ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS,
      refreshToken: AuthService.createRefreshToken(user),
      refreshTokenExpiresInMilliseconds: AuthService.REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS,
      status: user.getStatus().getValue(),
    };
  }

  private static createAccessToken(user: User): string {
    const payload = {
      userEmail: user.getEmail().getValue(),
      userId: user.getId().getValue(),
      username: user.getUsername().getValue(),
      userStatus: user.getStatus().getValue()
    };
    const expiresInSeconds = AuthService.ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS / 1000;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'temporary-secret', { expiresIn: expiresInSeconds });

    return accessToken;
  }

  private static createRefreshToken(user: User): string {
    const payload = {
      userId: user.getId().getValue(),
    };
    const expiresInSeconds = AuthService.REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS / 1000;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET! || 'temporary-secret', { expiresIn: expiresInSeconds });

    return refreshToken;
  }
}
