import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface PlaidVerifyIdentityEmailProps {
  validationCode: string;
  referenceNumber: string;
}

export const PlaidVerifyIdentityEmail = ({
  validationCode,
  referenceNumber,
}: PlaidVerifyIdentityEmailProps) => (
  <Html>
    <Head />
    <Preview>OTP: {validationCode}</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Img
            src="https://static.wixstatic.com/media/59c690_63b573c211fd44ec89b0103477bfc986~mv2.png/v1/fill/w_87,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/digio_logo.png"
            alt="Plaid"
            className="mx-auto"
          />
          <Text className="text-blue-600 text-xs font-bold uppercase mt-4 mb-2 text-center">
            Verify Your Identity
          </Text>
          <Heading className="text-black text-xl font-medium text-center mt-0 mb-0">
            Enter the following code to finish.
          </Heading>
          <Section className="bg-gray-100 rounded my-4 mx-auto w-70 text-center">
            <Text className="text-black text-4xl font-bold tracking-wider leading-10 py-2 mx-auto">
              {validationCode}
            </Text>
          </Section>
          <Text className="text-gray-700 text-lg mx-10 text-center">
            Reference Number: {referenceNumber}
          </Text>
          <Text className="text-gray-700 text-xs mx-10 text-center">
            Enter the code above within{" "}
            <Text className="text-blue-600 text-xl text-center">
              30 Seconds
            </Text>
          </Text>
          <Text className="text-black text-xs font-extrabold uppercase text-center mt-5">
            Digio Stock Inventory Management
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default PlaidVerifyIdentityEmail;
