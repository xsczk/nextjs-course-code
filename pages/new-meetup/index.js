import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

export default function NewMeetup() {
  const router = useRouter();
  async function addMeetupHander(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHander} />;
    </>
  );
}
