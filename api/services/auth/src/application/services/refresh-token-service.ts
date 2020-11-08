import jwt from 'jsonwebtoken';

import { User } from '../../domain/user/user';
import { Either, left, right } from "../../shared/logic/either";
import { ValidationError } from '../../shared/errors/validation-error';

export interface RefreshTokenPayload {
  userId: string;
}

export class RefreshTokenService {
  public static readonly EXPIRES_IN_MILLISECONDS = 900000;

  public static createRefreshToken(user: User): string {
    const payload: RefreshTokenPayload = {
      userId: user.getId().getValue(),
    };
    const expiresInSeconds = RefreshTokenService.EXPIRES_IN_MILLISECONDS / 1000;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accessToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: expiresInSeconds });

    return accessToken;
  }

  public static parseRefreshToken(accessToken: string): Either<ValidationError, RefreshTokenPayload> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const payload = jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET!);

      if (!RefreshTokenService.isPayloadCorrect(payload)) {
        throw new ValidationError('Invalid access token payload');
      }

      return right(payload);
    } catch (error) {
      return left(new ValidationError(error.message));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static isPayloadCorrect(plainPayload: any): plainPayload is RefreshTokenPayload {
    return typeof plainPayload === 'object' && typeof plainPayload.userId === 'string';
  }
}
