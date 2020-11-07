import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/unique-entity-id";
import { Username } from "./username";
import { Email } from "./email";
import { Status } from "./status";
import { HashedPassword } from "./hashed-password";
import { Timestamp } from "./timestamp";

interface UserData {
  username: Username;
  email: Email;
  hashedPassword: HashedPassword;
  status: Status;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class User extends Entity {
  private username: Username;
  private email: Email;
  private hashedPassword: HashedPassword;
  private status: Status;
  private createdAt: Timestamp;
  private updatedAt: Timestamp;

  public constructor(data: UserData, id?: UniqueEntityID | null) {
    super(id);

    this.username = data.username;
    this.email = data.email;
    this.hashedPassword = data.hashedPassword;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public getUsername(): Username {
    return this.username;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getHashedPassword(): HashedPassword {
    return this.hashedPassword;
  }

  public getStatus(): Status {
    return this.status;
  }

  public getCreatedAt(): Timestamp {
    return this.createdAt;
  }

  public getUpdatedAt(): Timestamp {
    return this.updatedAt;
  }
}
