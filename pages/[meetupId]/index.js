import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { uri } from "../api/new-meetup";
import Head from "next/head";

function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const newObjectId = new ObjectId(meetupId);
  const selectedMeetup = await meetupsCollection.findOne({
    _id: newObjectId,
  });
  client.close();
  const cloneMeetup = { ...selectedMeetup };
  delete cloneMeetup._id;

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        ...cloneMeetup,
      },
    },
  };
}

export default MeetupDetails;
