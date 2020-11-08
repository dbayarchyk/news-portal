import jwt from 'jsonwebtoken';

import { User } from '../../domain/user/user';
import { Either, left, right } from "../../shared/logic/either";
import { ValidationError } from '../../shared/errors/validation-error';

export interface AccessTokenPayload {
  userEmail: string;
  userId: string;
  username: string;
  userStatus: string;
}

export class AccessTokenService {
  public static readonly EXPIRES_IN_MILLISECONDS = 900000;

  public static createAccessToken(user: User): string {
    const payload: AccessTokenPayload = {
      userEmail: user.getEmail().getValue(),
      userId: user.getId().getValue(),
      username: user.getUsername().getValue(),
      userStatus: user.getStatus().getValue()
    };
    const expiresInSeconds = AccessTokenService.EXPIRES_IN_MILLISECONDS / 1000;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: expiresInSeconds });

    return accessToken;
  }

  public static parseAccessToken(accessToken: string): Either<ValidationError, AccessTokenPayload> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

      if (!AccessTokenService.isPayloadCorrect(payload)) {
        throw new ValidationError('Invalid access token payload');
      }
      
      return right(payload);
    } catch (error) {
      return left(new ValidationError(error.message));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static isPayloadCorrect(plainPayload: any): plainPayload is AccessTokenPayload {
    return typeof plainPayload === 'object'
           && typeof plainPayload.userEmail === 'string'
           && typeof plainPayload.userId === 'string'
           && typeof plainPayload.username === 'string'
           && typeof plainPayload.userStatus === 'string';
  }
}
