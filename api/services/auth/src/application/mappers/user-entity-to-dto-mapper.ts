import { UserDTO } from "../dto/user-dto";
import { User } from "../../domain/user/user";

export class UserEntityToDTOMapper {
  public static toDTOFromEntity(user: User): UserDTO {
    const id = user.getId();
    const username = user.getUsername();
    const email = user.getEmail();
    const status = user.getStatus();
    const createdAt = user.getCreatedAt();
    const updatedAt = user.getUpdatedAt();

    return {
      id: id.toValue(),
      username: username.getValue(),
      email: email.getValue(),
      status: status.getValue(),
      createdAt: createdAt.getValue(),
      updatedAt: updatedAt.getValue(),
    };
  }
}
