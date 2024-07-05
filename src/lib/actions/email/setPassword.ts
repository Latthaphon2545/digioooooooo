import { passwordSetEmail } from "@/components/email/password";
import { formAccount, transporter } from "@/lib/sendEmail";

export const setPasswordSend = async ({
  element,
  password,
}: {
  element: any;
  password: any;
}) => {
  const info = await transporter.sendMail({
    from: formAccount,
    to: element.email,
    subject: `Welcome to Digio Stock ${element.name}`,
    html: passwordSetEmail({
      invitedByEmail: element.email,
      invitedByName: element.name,
      invitedByPassword: password,
      type: "setPassword",
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
