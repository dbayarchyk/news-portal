import { inject, injectable } from "inversify";

import { SignInUseCase } from "../../application/use-cases/sign-in-use-case";
import { SignUpUseCase } from "../../application/use-cases/sign-up-use-case";
import { UserRepository } from "../../domain/user/user-repository";
import TYPES from "../ioc/types";

@injectable()
export class UserServiceLocator {
  public readonly signInUseCase: SignInUseCase;
  public readonly signUpUseCase: SignUpUseCase;

  public constructor(
    @inject(TYPES.UserRepository) userRepository: UserRepository
  ) {
    this.signInUseCase = new SignInUseCase(userRepository);
    this.signUpUseCase = new SignUpUseCase(userRepository);
  }
}
