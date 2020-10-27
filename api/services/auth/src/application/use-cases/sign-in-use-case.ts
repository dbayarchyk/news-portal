import { UserRepository } from "../../domain/user/user-repository";
import { Email } from "../../domain/user/email";
import { HashedPassword } from "../../domain/user/hashed-password";
import { AllowedStatus } from "../../domain/user/status";
import { User } from "../../domain/user/user";
import { Either, left, right } from "../../shared/logic/either";
import { UseCase } from "../../shared/application/use-case";

export interface SignIRequestDTO {
  email: string;
  password: string;
}

export interface AuthCredentials {
  accessToken: string;
  refreshToken: string;
  status: AllowedStatus;
}

export class SignInUseCase
  implements UseCase<SignIRequestDTO, Either<Error[], AuthCredentials>> {
  public constructor(private userRepository: UserRepository) {}

  public async execute(
    requestDTO: SignIRequestDTO
  ): Promise<Either<Error[], AuthCredentials>> {
    const errorOrUser = await this.getMatchingUser(requestDTO);

    if (errorOrUser.isLeft()) {
      const error = errorOrUser.value;
      return left(error);
    }

    const user = errorOrUser.value;
    const authCredentials = this.createAuthCredentials(user);

    return right(authCredentials);
  }

  private async getMatchingUser(
    requestDTO: SignIRequestDTO
  ): Promise<Either<Error[], User>> {
    const errorOrEmail = Email.create(requestDTO.email);

    if (errorOrEmail.isLeft()) {
      const error = errorOrEmail.value;
      return left([error]);
    }

    const email = errorOrEmail.value;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      const error = new Error("The user with this email does not exist.");
      return left([error]);
    }

    const errorOrHashedPassword = HashedPassword.createFromUnHashedPassword(
      requestDTO.password
    );

    if (
      errorOrHashedPassword.isLeft() ||
      !user.isPasswordEqual(errorOrHashedPassword.value)
    ) {
      const error = new Error("The password does not match.");
      return left([error]);
    }

    return right(user);
  }

  private createAuthCredentials(user: User): AuthCredentials {
    // TODO: create real auth tokens.
    return {
      accessToken: "" + user.getEmail().getValue(),
      refreshToken: "" + user.getEmail().getValue(),
      status: user.getStatus().getValue(),
    };
  }
}
