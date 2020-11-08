import { injectable, inject } from "inversify";

import { UserRepository } from "../../domain/user/user-repository";
import { Either, left, right } from "../../shared/logic/either";
import { UseCase } from "../../shared/application/use-case";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";
import { ValidationError } from '../../shared/errors/validation-error';
import { IOCTypes } from '../../infrastructure/ioc/types';
import { AccessTokenService } from '../services/access-token-service';
import { UserEntityToDTOMapper } from "../mappers/user-entity-to-dto-mapper";
import { UserDTO } from "../dto/user-dto";

export interface GetCurrentUserRequestDTO {
  accessToken: string;
}

@injectable()
export class GetCurrentUserUseCase
  implements
    UseCase<GetCurrentUserRequestDTO, Either<Error, UserDTO>> {
  public constructor(
    @inject(IOCTypes.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async execute(
    requestDTO: GetCurrentUserRequestDTO
  ): Promise<Either<ValidationError, UserDTO>> {
    const errorOrAccessTokenPayload = AccessTokenService.parseAccessToken(requestDTO.accessToken);

    if (errorOrAccessTokenPayload.isLeft()) {
      const error = errorOrAccessTokenPayload.value;
      return left(error);
    }

    const accessTokenPayload = errorOrAccessTokenPayload.value;
    const userId = new UniqueEntityID(accessTokenPayload.userId);
    const currentUser = await this.userRepository.findUserById(userId);

    if (currentUser === null) {
      return left(new ValidationError('Requesting user not found'));
    }

    return right(UserEntityToDTOMapper.toDTOFromEntity(currentUser));
  }
}