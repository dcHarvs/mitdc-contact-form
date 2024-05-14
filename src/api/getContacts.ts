import axios from "axios";

export default async function getContacts() {
  try {
    const { data } = await axios.get("http://localhost:4000/api/contacts", {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}