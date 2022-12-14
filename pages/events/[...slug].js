import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/event/Event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";

function FilteredEvents() {
  const router = useRouter();
  const reqData = router.query.slug;
  if (!reqData) {
    return <p className="center">Loading.....</p>;
  }
  const filterYear = reqData[0];
  const filterMonth = reqData[1];

  const num_year = +filterYear;
  const num_month = +filterMonth;
  const events = getFilteredEvents({ year: num_year, month: num_month });

  if (!events || events.length == 0) {
    return (
      <Fragment>
        <p>No events found for the chosen filter</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (
    isNaN(num_month) ||
    isNaN(num_year) ||
    num_year > 2030 ||
    num_month < 1 ||
    num_month > 12
  ) {
    return (
      <Fragment>
        <p>Invalid filter.Please adjust filter values</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(num_year, num_month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export default FilteredEvents;
