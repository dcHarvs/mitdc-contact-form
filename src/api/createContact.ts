import { axiosClient } from ".";

export default async function createContact(formData: any) {
  try {
    const { data } = await axiosClient.post("/api/contacts", formData);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}