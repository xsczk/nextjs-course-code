import { MongoClient } from "mongodb";
// /api/new-meetup
export const uri =
  "mongodb+srv://wowminhnghia:M3RIbVJbUkWRmcQC@cluster0.6xtdizt.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const { title, image, address, description } = data;
    const client = await MongoClient.connect(uri);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetups inserted successfully" });
  }
}
