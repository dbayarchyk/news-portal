import { injectable, inject } from "inversify";

import { UserRepository } from "../../domain/user/user-repository";
import { HashedPassword } from "../../domain/user/hashed-password";
import { User } from "../../domain/user/user";
import { Timestamp } from "../../domain/user/timestamp";
import { Email } from "../../domain/user/email";
import { Username } from "../../domain/user/username";
import { Status, AllowedStatus } from "../../domain/user/status";
import { UserDTO } from "../dto/user-dto";
import { UserEntityToDTOMapper } from "../mappers/user-entity-to-dto-mapper";
import { Either, left, right, mergeInMany } from "../../shared/logic/either";
import { UseCase } from "../../shared/application/use-case";
import { ValidationError } from "../../shared/errors/validation-error";
import { FieldsValidationError } from "../../shared/errors/fields-validation-error";
import { IOCTypes } from '../../infrastructure/ioc/types';

export interface SignUpRequestDTO {
  username: string;
  email: string;
  password: string;
}

@injectable()
export class SignUpUseCase
  implements UseCase<SignUpRequestDTO, Either<FieldsValidationError, UserDTO>> {
  public constructor(
    @inject(IOCTypes.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async execute(
    requestDTO: SignUpRequestDTO
  ): Promise<Either<FieldsValidationError, UserDTO>> {
    const errorOrUser = await this.createNewUser(requestDTO);

    if (errorOrUser.isLeft()) {
      const error = errorOrUser.value;
      return left(error);
    }

    const user = errorOrUser.value;

    await this.userRepository.save(user);

    return right(UserEntityToDTOMapper.toDTOFromEntity(user));
  }

  private async createNewUser(
    requestDTO: SignUpRequestDTO
  ): Promise<Either<FieldsValidationError, User>> {
    const errorOrUsername = await this.createUsername(requestDTO.username);
    const errorOrEmail = await this.createEmail(requestDTO.email);
    const errorOrHashedPassword = HashedPassword.createFromUnHashedPassword(
      requestDTO.password
    );

    return mergeInMany([
      errorOrUsername.mapLeft(this.mapToFieldError("username")),
      errorOrEmail.mapLeft(this.mapToFieldError("email")),
      errorOrHashedPassword.mapLeft(this.mapToFieldError("password")),
      Status.create(AllowedStatus.UNCONFIRMED).mapLeft(this.mapToFieldError("status")),
      Timestamp.create().mapLeft(this.mapToFieldError("createdAt")),
      Timestamp.create().mapLeft(this.mapToFieldError("updatedAt")),
    ])
      .mapLeft((attributesErrors) => new FieldsValidationError(attributesErrors))
      .mapRight((attributes) => this.mapUserAttributesToUser(attributes));
  }

  private async createUsername(
    rawUsername: string
  ): Promise<Either<ValidationError, Username>> {
    const errorOrUsername = Username.create(rawUsername);

    if (errorOrUsername.isLeft()) {
      return errorOrUsername;
    }

    const username = errorOrUsername.value;

    if (await this.isUsernameTaken(username)) {
      const error = new ValidationError("This username is already taken.");
      return left(error);
    }

    return right(username);
  }

  private async isUsernameTaken(username: Username): Promise<boolean> {
    const user = await this.userRepository.findUserByUsername(username);

    return user !== null;
  }

  private async createEmail(
    rawEmail: string
  ): Promise<Either<ValidationError, Email>> {
    const errorOrEmail = Email.create(rawEmail);

    if (errorOrEmail.isLeft()) {
      return errorOrEmail;
    }

    const email = errorOrEmail.value;

    if (await this.isEmailTaken(email)) {
      const error = new ValidationError("This email is already taken.");
      return left(error);
    }

    return right(email);
  }

  private async isEmailTaken(email: Email): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);

    return user !== null;
  }

  private mapToFieldError(field: string) {
    return <TError>(error: TError) => ({ field, error });
  }

  private mapUserAttributesToUser([
    username,
    email,
    hashedPassword,
    status,
    createdAt,
    updatedAt,
  ]: [Username, Email, HashedPassword, Status, Timestamp, Timestamp]): User {
    return new User({
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      status,
      createdAt,
      updatedAt,
    });
  }
}
