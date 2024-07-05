import { passwordSetEmail } from "@/components/email/password";
import { formAccount, transporter } from "@/lib/sendEmail";

export const forgotPasswordSend = async ({
  updatedUser,
  password,
}: {
  updatedUser: any;
  password: any;
}) => {
  const info = await transporter.sendMail({
    from: formAccount,
    to: updatedUser.email,
    subject: `Forgot Password - ${updatedUser.name}`,
    html: passwordSetEmail({
      invitedByEmail: updatedUser.email,
      invitedByName: updatedUser.name,
      invitedByPassword: password,
      type: "forgotPassword",
    }),
    attachments: [
      {
        filename: "digio_logo.png",
        path: "public/image/digio_logo.png",
        cid: "digio_logo",
      },
    ],
  });

  return info;
};
