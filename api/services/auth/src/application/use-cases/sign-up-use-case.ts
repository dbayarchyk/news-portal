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

export interface SignUpRequestDTO {
  username: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  public constructor(private userRepository: UserRepository) {}

  public async execute(
    requestDTO: SignUpRequestDTO
  ): Promise<Either<Error[], UserDTO>> {
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
  ): Promise<Either<Error[], User>> {
    const errorOrUsername = await this.createUsername(requestDTO.username);
    const errorOrEmail = await this.createEmail(requestDTO.email);
    const errorOrHashedPassword = HashedPassword.createFromUnHashedPassword(
      requestDTO.password
    );

    return mergeInMany([
      errorOrUsername,
      errorOrEmail,
      errorOrHashedPassword,
      Status.create(AllowedStatus.UNCONFIRMED),
      Timestamp.create(),
      Timestamp.create(),
    ]).map(
      ([username, email, hashedPassword, status, createdAt, updatedAt]) => {
        return new User({
          username: username,
          email: email,
          hashedPassword: hashedPassword,
          status,
          createdAt,
          updatedAt,
        });
      }
    );
  }

  private async createUsername(
    rawUsername: string
  ): Promise<Either<Error, Username>> {
    const errorOrUsername = Username.create(rawUsername);

    if (errorOrUsername.isLeft()) {
      return errorOrUsername;
    }

    const username = errorOrUsername.value;

    if (await this.isUsernameTaken(username)) {
      const error = new Error("This username is already taken.");
      return left(error);
    }

    return right(username);
  }

  private async isUsernameTaken(username: Username): Promise<boolean> {
    const user = await this.userRepository.findUserByUsername(username);

    return user !== null;
  }

  private async createEmail(rawEmail: string): Promise<Either<Error, Email>> {
    const errorOrEmail = Email.create(rawEmail);

    if (errorOrEmail.isLeft()) {
      return errorOrEmail;
    }

    const email = errorOrEmail.value;

    if (await this.isEmailTaken(email)) {
      const error = new Error("This email is already taken.");
      return left(error);
    }

    return right(email);
  }

  private async isEmailTaken(email: Email): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);

    return user !== null;
  }
}
