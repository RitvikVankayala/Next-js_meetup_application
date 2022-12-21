import { MongoClient } from "mongodb";

async function newsletter(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    const url =
      "mongodb+srv://RitvikVankayala:HJJGJHQaQJ4QGVSx@testing.d0mxu8y.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    const dbName = "Events";

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("newsletter");
    const insertResult = await collection.insertOne({ email: email });
    client.close();
    res.status(201).json({ message: "signed up" });
  }
}
export default newsletter;
//try and catch for the error prediction
