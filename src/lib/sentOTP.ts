import axios from "axios";

interface IProps {
  email: string;
  setShowModal?: (value: boolean) => void;
  setError?: (value: boolean) => void;
  setRefNum: (value: string) => void;
  setTimeLeft?: (value: number) => void;
  setResendOtp?: (value: boolean) => void;
  setBoolGenerateOtp?: (value: boolean) => void;
}

export const sendOtp = async ({
  email,
  setShowModal,
  setError,
  setRefNum,
  setTimeLeft,
  setResendOtp,
  setBoolGenerateOtp,
}: IProps) => {
  try {
    if (setBoolGenerateOtp) setBoolGenerateOtp(true);
    if (setError) setError(false);
    const res = await axios.post("/api/otp/generateOTP", {
      email: email,
    });
    setRefNum(res.data.message);
  } catch (e) {
    console.log(e);
  } finally {
    if (setBoolGenerateOtp) setBoolGenerateOtp(false);
    if (setTimeLeft) setTimeLeft(30);
    if (setResendOtp) setResendOtp(false);
    if (setShowModal) setShowModal(true);
  }
};
