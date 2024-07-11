import axios from "axios";

interface GetUserProps {
  filter: string;
  search: string;
  skip: string;
  take: string;
  setLoading: (loading: boolean) => void;
}

export const GetAllUsers = async ({
  filter,
  search,
  skip,
  take,
  setLoading,
}: GetUserProps) => {
  try {
    const res = await axios.get(
      `/api/users/getUsers?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
    );
    const data = {
      users: res.data.users,
      length: res.data.length,
    };
    return data;
  } catch (err) {
    console.log(err);
    return {
      users: [],
      length: 0,
    };
  } finally {
    setLoading(false);
  }
};
