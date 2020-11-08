import { User } from '../../domain/user/user';
import { AllowedStatus } from "../../domain/user/status";
import { AccessTokenService } from './access-token-service';
import { RefreshTokenService } from './refresh-token-service';

export interface AuthCredentials {
  accessToken: string;
  accessTokenExpiresInMilliseconds: number;
  refreshToken: string;
  refreshTokenExpiresInMilliseconds: number;
  status: AllowedStatus;
}

export class AuthService {
  public static createAuthCredentials(user: User): AuthCredentials {
    return {
      accessToken: AccessTokenService.createAccessToken(user),
      accessTokenExpiresInMilliseconds: AccessTokenService.EXPIRES_IN_MILLISECONDS,
      refreshToken: RefreshTokenService.createRefreshToken(user),
      refreshTokenExpiresInMilliseconds: RefreshTokenService.EXPIRES_IN_MILLISECONDS,
      status: user.getStatus().getValue(),
    };
  }
}
