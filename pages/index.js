import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { uri } from "./api/new-meetup";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

export async function getStaticProps() {
  // fetch data from the api
  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(({ title, image, address, _id }) => ({
        title,
        image,
        address,
        id: _id.toString(),
      })),
    },
  };
}

export default HomePage;
