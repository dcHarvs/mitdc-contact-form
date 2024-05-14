import { axiosClient } from ".";

export default async function deleteContact(id: number) {
  try {
    const { data } = await axiosClient.delete(`/api/contacts/${id}`);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}