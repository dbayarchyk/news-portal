import { User } from "../../../../domain/user/user";
import { UserPersistance } from "../user-model";

export class UserEntityToPersistanceMapper {
  public static mapEntityToPersistance(user: User): UserPersistance {
    const id = user.getId();
    const email = user.getEmail();
    const username = user.getUsername();
    const hashedPassword = user.getHashedPassword();
    const status = user.getStatus();
    const createdAt = user.getCreatedAt();
    const updatedAt = user.getUpdatedAt();

    return {
      _id: id.getValue(),
      email: email.getValue(),
      username: username.getValue(),
      hashedPassword: hashedPassword.getValue(),
      status: status.getValue(),
      createdAt: createdAt.getValue(),
      updatedAt: updatedAt.getValue(),
    };
  }
}
