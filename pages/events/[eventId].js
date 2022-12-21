import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Head from "next/head";
import Comments from "../../components/input/comments";

function IndiEvent(props) {
  const reqEvent = props.selected_event;

  if (!reqEvent) {
    return <div className="center">No Event Found Buddy!!</div>;
  }
  return (
    <Fragment>
      <Head>
        <title>{reqEvent.title}</title>
        <meta name="description" content={reqEvent.description} />
      </Head>
      <EventSummary title={reqEvent.title} />
      <EventLogistics
        date={reqEvent.date}
        address={reqEvent.location}
        image={reqEvent.image}
        imageAlt={reqEvent.title}
      />
      <EventContent>
        <p>{reqEvent.description}</p>
      </EventContent>
      <Comments eventId={reqEvent.id} />
    </Fragment>
  );
}
export default IndiEvent;

export async function getStaticProps(context) {
  const eventid = context.params.eventId;
  const fetch_data = await getEventById(eventid);
  return {
    props: { selected_event: fetch_data },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
