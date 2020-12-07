import { Container } from "inversify";

import { IOCTypes } from "./types";
import { UserRepository } from "../../domain/user/user-repository";
import { UserRepositoryMongoose } from "../persistence/mongoose/user-repository-mongoose";
import { SignInUseCase } from "../../application/use-cases/sign-in-use-case";
import { SignUpUseCase } from "../../application/use-cases/sign-up-use-case";
import { GetCurrentUserUseCase } from "../../application/use-cases/get-current-user-use-case";
import { RefreshTokensUseCase } from "../../application/use-cases/refresh-tokens-use-case";

export const iocContainer = new Container();

iocContainer
  .bind<UserRepository>(IOCTypes.UserRepository)
  .to(UserRepositoryMongoose);

iocContainer
  .bind<SignUpUseCase>(IOCTypes.SignUpUseCase)
  .to(SignUpUseCase);

iocContainer
  .bind<SignInUseCase>(IOCTypes.SignInUseCase)
  .to(SignInUseCase);

iocContainer
  .bind<GetCurrentUserUseCase>(IOCTypes.GetCurrentUserUseCase)
  .to(GetCurrentUserUseCase);

iocContainer
  .bind<RefreshTokensUseCase>(IOCTypes.RefreshTokensUseCase)
  .to(RefreshTokensUseCase);
