import React from "react";
import PropTypes, { InferProps } from "prop-types";

const propTypes = {
  confirmationLink: PropTypes.string.isRequired,
}

type SignUpConfirmationEmailProps = InferProps<typeof propTypes>;

const SignUpConfirmationEmail: EmailFC<SignUpConfirmationEmailProps> = ({
  confirmationLink,
}) => {
  return (
    <React.Fragment>
      <p>Dear customer,</p>

      <p>Thank you for signing up on IT Dog!</p>
      <p>Please click on the following link to confirm your email address and complete the process.</p>

      <p><a href={confirmationLink}>{confirmationLink}</a></p>
    </React.Fragment>
  );
};

SignUpConfirmationEmail.subject = "Sign up confirmation on IT Dog";
SignUpConfirmationEmail.sampleProps = {
  confirmationLink: "/",
};
SignUpConfirmationEmail.propTypes = propTypes;

export default SignUpConfirmationEmail;
