import { User } from "./user";

export interface UserRepository {
  findUserById(articleId: string): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  save(comment: User): Promise<void>;
  exists(comment: User): Promise<boolean>;
}
