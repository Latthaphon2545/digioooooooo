import axios from "axios";

export default async function Home() {
  try {
    const getdata = await axios.get("http://localhost:3000/api");
    console.log(getdata.data);
  } catch (err) {
    console.log(err);
  }

  return <>
  
  </>;
}
