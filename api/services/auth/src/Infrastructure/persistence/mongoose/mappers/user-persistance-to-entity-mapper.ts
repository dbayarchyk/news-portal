import { User } from "../../../../domain/user/user";
import { Timestamp } from "../../../../domain/user/timestamp";
import { HashedPassword } from "../../../../domain/user/hashed-password";
import { Email } from "../../../../domain/user/email";
import { Username } from "../../../../domain/user/username";
import { Status } from "../../../../domain/user/status";
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { UserPersistance } from "../user-model";

export class UserPersistanceToEntityMapper {
  public static mapPersistanceToEntity(userPersistance: UserPersistance): User {
    // TODO: Should we pass the errors up?
    const user = new User(
      {
        username: Username.create(userPersistance.username).value as Username,
        email: Email.create(userPersistance.email).value as Email,
        hashedPassword: HashedPassword.createFromHashedPassword(
          userPersistance.hashedPassword
        ),
        status: Status.create(userPersistance.status).value as Status,
        createdAt: Timestamp.create(userPersistance.createdAt)
          .value as Timestamp,
        updatedAt: Timestamp.create(userPersistance.updatedAt)
          .value as Timestamp,
      },
      new UniqueEntityID(userPersistance._id)
    );

    return user;
  }
}
