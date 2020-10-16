import { UserRepository } from "../../domain/user/user-repository";
import { HashedPassword } from "../../domain/user/hashed-password";
import { User } from "../../domain/user/user";
import { Timestamp } from "../../domain/user/timestamp";
import { Email } from "../../domain/user/email";
import { Username } from "../../domain/user/username";
import { Status } from "../../domain/user/status";
import { Result } from "../../shared/logic/result";
import { CombinedResultErrorToFieldErrorsDTOMapper } from "../mappers/combined-result-error-to-field-errors-dto-mapper";

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export type SignUpValidationErrors = Partial<
  Record<keyof SignUpRequest, string>
>;

export class SignUpUseCase {
  public constructor(private userRepository: UserRepository) {}

  public async execute(
    request: SignUpRequest
  ): Promise<Result<void, SignUpValidationErrors>> {
    const userOrErrorResult = await this.createUserOrErrorResult(request);

    if (userOrErrorResult.checkStatus("failure")) {
      return this.handleUserErrorResult(userOrErrorResult);
    }

    const user = userOrErrorResult.getValue();

    await this.userRepository.save(user);

    return Result.ok();
  }

  private async createUserOrErrorResult(request: SignUpRequest) {
    const userDataOrErrorResult = await this.createUserDataOrErrorResult(
      request
    );

    if (userDataOrErrorResult.checkStatus("failure")) {
      return Result.fail(userDataOrErrorResult.getError());
    }

    const userData = userDataOrErrorResult.getValue();
    const user = new User({
      username: userData.username.getValue(),
      email: userData.email.getValue(),
      hashedPassword: userData.hashedPassword.getValue(),
      status: userData.status.getValue(),
      createdAt: userData.createdAt.getValue(),
      updatedAt: userData.updatedAt.getValue(),
    });

    return Result.ok(user);
  }

  private async createUserDataOrErrorResult(request: SignUpRequest) {
    const usernameResult = await this.createUsernameOrErrorResult(
      request.username
    );
    const emailResult = await this.createEmailOrErrorResult(request.email);

    const userDataOrErrorResult = Result.combine({
      username: usernameResult,
      email: emailResult,
      hashedPassword: HashedPassword.createFromUnHashedPassword(
        request.password
      ),
      status: Status.create("UNCONFIRMED"),
      createdAt: Timestamp.create(),
      updatedAt: Timestamp.create(),
    });

    return userDataOrErrorResult;
  }

  private async createUsernameOrErrorResult(
    username: string
  ): Promise<Result<Username, Error>> {
    if (await this.isUsernameTaken(username)) {
      return Result.fail(new Error("This username is already taken."));
    }

    return Username.create(username);
  }

  private async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.userRepository.findUserByUsername(username);

    return user !== null;
  }

  private async createEmailOrErrorResult(
    email: string
  ): Promise<Result<Email, Error>> {
    if (await this.isEmailTaken(email)) {
      return Result.fail(new Error("This email is already taken."));
    }

    return Email.create(email);
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);

    return user !== null;
  }

  private handleUserErrorResult(
    errorResult: Result<
      unknown,
      {
        username?: Result<unknown, Error>;
        email?: Result<unknown, Error>;
        hashedPassword?: Result<unknown, Error>;
        status?: Result<unknown, Error>;
        createdAt?: Result<unknown, Error>;
        updatedAt?: Result<unknown, Error>;
      }
    >
  ) {
    const combinedResultErrors = errorResult.getError();
    const errorsDTO = CombinedResultErrorToFieldErrorsDTOMapper.toFieldErrorsDTOFromCombinedResultError(
      combinedResultErrors
    );

    return Result.fail(errorsDTO);
  }
}
