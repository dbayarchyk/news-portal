import { Container } from "inversify";

import TYPES from "./types";
import { CommentRepository } from "../../domain/comment/comment-repository";
import { CommentRepositoryMongoose } from "../persistence/mongoose/comment-repository-mongoose";
import { CommentServiceLocator } from "../service-locator/comment-service-locator";

export const iocContainer = new Container();

iocContainer
  .bind<CommentRepository>(TYPES.CommentRepository)
  .to(CommentRepositoryMongoose);
iocContainer
  .bind<CommentServiceLocator>(TYPES.CommentServiceLocator)
  .to(CommentServiceLocator);
