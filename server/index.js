import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(cors())
app.use(express.json());

const contacts = [
  {
    id: 1,
    name: "Harvey Dela Cruz",
    mobile: "0931231232",
    email: "dc.harvs@gmail.com"
  },
  {
    id: 2,
    name: "John Doe",
    mobile: "+54123153",
    email: "john.doe@sample.com"
  },
  {
    id: 3,
    name: "Jane Doe",
    mobile: "+2513545",
    email: "jane.doe@sample.com"
  }
]

app.get("/api/contacts", (_req, res) => {
  res.json(contacts);
});

app.post("/api/contacts", (req, res) => {
  const maxId = contacts.reduce((max, contact) => (contact.id > max ? contact.id : max), 0);

  contacts.push(Object.assign(req.body, { id: maxId + 1 }));

  res.json(contacts);
});

app.delete("/api/contacts/:id", () => {

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))