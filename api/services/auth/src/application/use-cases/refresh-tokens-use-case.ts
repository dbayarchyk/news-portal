import { injectable, inject } from "inversify";

import { UserRepository } from "../../domain/user/user-repository";
import { Either, left, right } from "../../shared/logic/either";
import { UseCase } from "../../shared/application/use-case";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";
import { ValidationError } from "../../shared/errors/validation-error";
import { IOCTypes } from '../../infrastructure/ioc/types';
import { AuthService, AuthCredentials } from '../services/auth-service';
import { RefreshTokenService } from '../services/refresh-token-service';

export interface RefreshTokensRequestDTO {
  refreshToken: string;
}

@injectable()
export class RefreshTokensUseCase
  implements
    UseCase<RefreshTokensRequestDTO, Either<ValidationError, AuthCredentials>> {
  public constructor(
    @inject(IOCTypes.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async execute(
    requestDTO: RefreshTokensRequestDTO
  ): Promise<Either<ValidationError, AuthCredentials>> {
    const errorOrTokenPayload = RefreshTokenService.parseRefreshToken(requestDTO.refreshToken);

    if (errorOrTokenPayload.isLeft()) {
      const error = errorOrTokenPayload.value;
      return left(error);
    }

    const tokenPayload = errorOrTokenPayload.value;
    const userId = new UniqueEntityID(tokenPayload.userId);
    const user = await this.userRepository.findUserById(userId);

    if (user === null) {
      return left(new ValidationError('Requesting user not found'));
    }

    const authCredentials = AuthService.createAuthCredentials(user);

    return right(authCredentials);
  }
}
