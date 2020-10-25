import { Container } from "inversify";

import TYPES from "./types";
import { UserRepository } from "../../domain/user/user-repository";
import { UserRepositoryMongoose } from "../persistence/mongoose/user-repository-mongoose";
import { UserServiceLocator } from "../service-locators/user-service-locator";

export const iocContainer = new Container();

iocContainer
  .bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepositoryMongoose);
iocContainer
  .bind<UserServiceLocator>(TYPES.UserServiceLocator)
  .to(UserServiceLocator);
