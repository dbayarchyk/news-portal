import { Result } from "../../shared/logic/result";

export class CombinedResultErrorToFieldErrorsDTOMapper {
  public static toFieldErrorsDTOFromCombinedResultError<
    T extends Partial<Record<string, Result<unknown, Error>>>
  >(combinedErrors: T): Record<keyof T, string> {
    const fieldErrorsDTO = Object.keys(combinedErrors).reduce(
      (errors, field) => {
        const fieldResult = combinedErrors[field];

        if (!fieldResult) {
          return errors;
        }

        return {
          ...errors,
          [field]: fieldResult.getError().message,
        };
      },
      {} as Record<keyof T, string>
    );

    return fieldErrorsDTO;
  }
}
