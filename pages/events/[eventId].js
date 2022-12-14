import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function IndiEvent() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const reqEvent = getEventById(eventId);

  if (!reqEvent) {
    return <p>No Event Found Buddy!!</p>;
  }
  return (
    <Fragment>
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
    </Fragment>
  );
}
export default IndiEvent;
