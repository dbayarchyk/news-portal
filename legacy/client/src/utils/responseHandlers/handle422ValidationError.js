import ValidationErrors from "../../errors/validationErrors";

function handle422ValidationError(error) {
  const errors = error.detail.reduce((errorsAccumulator, errorDetail) => {
    const field = errorDetail.loc[errorDetail.loc.length - 1];

    return {
      ...errorsAccumulator,
      [field]: errorDetail.msg,
    };
  }, {});

  throw new ValidationErrors(errors);
}

export default handle422ValidationError;
