import { useForm } from "react-hook-form";
import "./index.css"
import { useCallback, useEffect, useState } from "react";
import getContacts from "./api/getContacts";
import createContact from "./api/createContact";
import deleteContact from "./api/deleteContact";

type FormFields = {
  id?: number;
  name: string;
  email: string;
  mobile: string;
}

function App() {
  const [contacts, setContacts] = useState<FormFields[]>([]);
  const { register, reset, handleSubmit } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    const response = await createContact(data);
    const responseData = await response.json();
    setContacts(responseData);

    // reset();
  }

  const handleSetContacts = useCallback(async () => {
    const response = await getContacts();
    const data = await response.json();

    setContacts(data);
  }, []);

  const handleDelete = useCallback((id: number) => {
    deleteContact(id);
  }, [])

  useEffect(() => {
    handleSetContacts();
  }, [handleSetContacts]);

  return (
    <main className="w-screen h-screen flex justify-center gap-10">
      <section className="flex-1 max-w-screen-md pt-10 px-2 space-y-4">
        <p className="text-4xl font-bold">Add New Contact</p>
        <form className="h-auto w-full flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label className="w-14" htmlFor="">Name:</label>
            <input className="border" type="text" {...register("name", { required: true })} />
          </fieldset>
          <fieldset>
            <label className="w-14" htmlFor="">E-mail:</label>
            <input className="border" type="email" {...register("email", { required: true,  })} />
          </fieldset>
          <fieldset>
            <label className="w-14" htmlFor="">Mobile:</label>
            <input className="border" type="text" {...register("mobile", { required: true })} />
          </fieldset>

          <button className="border border-gray-600 bg-gray-500 text-white rounded-md p-2" type="submit">New Contact</button>
        </form>

        <p className="text-4xl font-bold">Contacts List</p>
        <ul className="space-y-2">
          {contacts?.map(({ id, name, mobile, email }) => {
            return (
              <li key={id} className="flex">
                <div className="flex-1 text-sm">
                  <p className="text-xl font-bold">{name}</p>
                  <p>{email}</p>
                  <p>{mobile}</p>
                </div>
                <button className="bg-red-600 text-white p-2 rounded-md" onClick={() => handleDelete(id as number)}>
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default App
