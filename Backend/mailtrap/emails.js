import { MailtrapClient } from "mailtrap";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const reciptent = [{ email: email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: reciptent,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const reciptent = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: reciptent,
      template_uuid: "4122da86-332c-44b8-b45a-c6bee29e87d3",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const reciptent = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: reciptent,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error("Error sending forgoot password email", error);
    throw new Error(`Error sending forgoot password  email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const reciptent = [{ email }];

    const response = await mailTrapClient.send({
      to: reciptent,
      sender: sender,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Email Send Successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
