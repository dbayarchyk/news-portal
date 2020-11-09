import { CookieOptions } from 'express';

import { AuthCredentials } from '../../../application/services/auth-service';

export type SetCookie = (name: string, value: string, options: CookieOptions) => void;

export class AuthCookiesService {
  public static setAuthCookies(authCredentials: AuthCredentials, setCookie: SetCookie): void {
    setCookie(
      'refresh-token',
      authCredentials.refreshToken,
      { maxAge: authCredentials.refreshTokenExpiresInMilliseconds, httpOnly: true }
    );
    setCookie(
      'access-token',
      authCredentials.accessToken,
      { maxAge: authCredentials.refreshTokenExpiresInMilliseconds, httpOnly: true }
    );
  }
}
