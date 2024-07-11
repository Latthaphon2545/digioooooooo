import axios from "axios";

interface ChangePasswordProps {
  userId: string;
}

export const GetAccount = async ({ userId }: ChangePasswordProps) => {
  try {
    const res = await axios.get(`/api/users/getUser?id=${userId}`);
    return res.data.users;
  } catch (e) {
    console.log(e);
  }
};
