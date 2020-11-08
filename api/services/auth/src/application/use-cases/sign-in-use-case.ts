import { injectable, inject } from "inversify";

import { UserRepository } from "../../domain/user/user-repository";
import { Email } from "../../domain/user/email";
import { User } from "../../domain/user/user";
import { Either, left, right } from "../../shared/logic/either";
import { UseCase } from "../../shared/application/use-case";
import { ValidationError } from "../../shared/errors/validation-error";
import { FieldsValidationError } from "../../shared/errors/fields-validation-error";
import { IOCTypes } from '../../infrastructure/ioc/types';
import { AuthService, AuthCredentials } from '../services/auth-service';

export interface SignIRequestDTO {
  email: string;
  password: string;
}

@injectable()
export class SignInUseCase
  implements
    UseCase<SignIRequestDTO, Either<FieldsValidationError, AuthCredentials>> {
  public constructor(
    @inject(IOCTypes.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async execute(
    requestDTO: SignIRequestDTO
  ): Promise<Either<FieldsValidationError, AuthCredentials>> {
    const errorOrUser = await this.getMatchingUser(requestDTO);

    if (errorOrUser.isLeft()) {
      const error = errorOrUser.value;
      return left(error);
    }

    const user = errorOrUser.value;
    const authCredentials = AuthService.createAuthCredentials(user);

    return right(authCredentials);
  }

  private async getMatchingUser(
    requestDTO: SignIRequestDTO
  ): Promise<Either<FieldsValidationError, User>> {
    const errorOrEmail = Email.create(requestDTO.email);

    if (errorOrEmail.isLeft()) {
      const error = new FieldsValidationError([
        { field: "email", error: errorOrEmail.value },
      ]);
      return left(error);
    }

    const email = errorOrEmail.value;
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      await this.userRepository.findUserByEmail(user.getUsername());
    }

    if (!user) {
      const error = new FieldsValidationError([
        {
          field: "email",
          error: new ValidationError(
            "The user with this email does not exist."
          ),
        },
      ]);
      return left(error);
    }

    const hashedPassword = user.getHashedPassword();
    const isPasswordEqual = await hashedPassword.equalsToPlainTextPassword(requestDTO.password);

    if (!isPasswordEqual) {
      const error = new FieldsValidationError([
        {
          field: "password",
          error: new ValidationError("The password does not match."),
        },
      ]);
      return left(error);
    }

    return right(user);
  }
}
