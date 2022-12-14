import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/event/Event-list";
import EventSearch from "../../components/event/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEvents() {
  const events = getAllEvents();
  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}
export default AllEvents;
