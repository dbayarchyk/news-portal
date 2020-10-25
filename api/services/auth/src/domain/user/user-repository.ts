import { UniqueEntityID } from "../../shared/domain/unique-entity-id";
import { User } from "./user";
import { Email } from "./email";
import { Username } from "./username";

export interface UserRepository {
  findUserById(userId: UniqueEntityID): Promise<User>;
  findUserByUsername(username: Username): Promise<User>;
  findUserByEmail(email: Email): Promise<User>;
  save(comment: User): Promise<void>;
  exists(comment: User): Promise<boolean>;
}
