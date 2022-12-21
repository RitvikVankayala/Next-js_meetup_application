import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/event/Event-list";
import EventSearch from "../../components/event/events-search";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEvents(props) {
  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Get all the Events for which your are looking for"
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}
export default AllEvents;
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: { events: events },
    revalidate: 60,
  };
}
