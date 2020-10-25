import { injectable } from "inversify";

import { UserRepository } from "../../../domain/User/user-repository";
import { User } from "../../../domain/user/user";
import { Email } from "../../../domain/user/email";
import { Username } from "../../../domain/user/username";
import { UniqueEntityID } from "../../../shared/domain/unique-entity-id";
import { UserModel } from "./user-model";
import { UserEntityToPersistanceMapper } from "./mappers/user-entity-to-persistance-mapper";
import { UserPersistanceToEntityMapper } from "./mappers/user-persistance-to-entity-mapper";

@injectable()
export class UserRepositoryMongoose implements UserRepository {
  public async findUserById(id: UniqueEntityID): Promise<User | null> {
    const rawUser = await UserModel.findOne({
      _id: id.getValue(),
    }).lean();

    if (!rawUser) {
      return null;
    }

    return UserPersistanceToEntityMapper.mapPersistanceToEntity(rawUser);
  }

  public async findUserByUsername(username: Username): Promise<User | null> {
    const rawUser = await UserModel.findOne({
      username: username.getValue(),
    }).lean();

    if (!rawUser) {
      return null;
    }

    return UserPersistanceToEntityMapper.mapPersistanceToEntity(rawUser);
  }

  public async findUserByEmail(email: Email): Promise<User | null> {
    const rawUser = await UserModel.findOne({
      email: email.getValue(),
    }).lean();

    if (!rawUser) {
      return null;
    }

    return UserPersistanceToEntityMapper.mapPersistanceToEntity(rawUser);
  }

  public async save(user: User): Promise<void> {
    const userExists = await this.exists(user);
    const userPersistence = UserEntityToPersistanceMapper.mapEntityToPersistance(
      user
    );

    if (userExists) {
      await UserModel.update({ _id: user.getId().getValue() }, userPersistence);
    } else {
      await UserModel.create(userPersistence);
    }
  }

  public async exists(user: User): Promise<boolean> {
    const userId = user.getId();
    const rawUser = await UserModel.findById(userId.getValue()).lean();

    if (rawUser === null) {
      return false;
    }

    return true;
  }
}
