import { encode } from "@/lib/generateRandomHref";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  invitedByEmail: string;
  invitedByName: string;
  invitedByPassword: string;
}

export const VercelInviteUserEmail = ({
  invitedByEmail,
  invitedByName,
  invitedByPassword,
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByEmail} on Vercel`;
  const url = `email=${invitedByEmail}&password=${invitedByPassword}&name=${invitedByName}`;
  const inviteLink = `http://localhost:3000/setpassword?${encode(url)}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://static.wixstatic.com/media/59c690_63b573c211fd44ec89b0103477bfc986~mv2.png/v1/fill/w_87,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/digio_logo.png"
                alt="Plaid"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{invitedByName}</strong> on{" "}
              <strong>Digio Stock</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {invitedByName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByName}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              )
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Set your password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Click the button above to set your password and join{" "}
              <strong>{invitedByName}</strong> on <strong>Digio Stock</strong>.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{invitedByName}</span> If you were
              not expecting this invitation, you can ignore this email. If you
              are concerned about your account's safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;
