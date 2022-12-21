import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/event/Event-list";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Nextjs Events</title>
        <meta
          name="description"
          content="Find a lot of Event that you should attend"
        />
      </Head>
      <NewsletterRegistration />

      <EventList items={props.events} />
    </div>
  );
}
export default HomePage;
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
      revalidate: 1800,
    },
  };
}
