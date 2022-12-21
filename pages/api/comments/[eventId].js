import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const url =
    "mongodb+srv://RitvikVankayala:HJJGJHQaQJ4QGVSx@testing.d0mxu8y.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  const dbName = "Events-1";

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === " " ||
      !text ||
      text.trim() === " "
    ) {
      res.status(422).json({ message: "Invalid user inputs" });
      return;
    }
    const new_comment = {
      email,
      name,
      text,
      eventId,
    };
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("comments");
    const insertResult = await collection.insertOne(new_comment);
    new_comment.id = insertResult.insertedId;

    res.status(201).json({ message: "Added comment", comment: new_comment });
  }

  if (req.method === "GET") {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("comments");
    const output = await collection.find({}).toArray();

    res.status(200).json({ comment: output });
  }
  client.close();
}
export default handler;
// let dummylist = [
//   { id: "c1", name: "Rik", text: "A first comment" },
//   { id: "c2", name: "Tik", text: "A sec comment" },
// ];
