import { getFilteredEvents } from "../../helpers/api-utils";
import { useRouter } from "next/router";
import EventList from "../../components/event/Event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import Head from "next/head";

function FilteredEvents(props) {
  const router = useRouter();
  const events = props.events;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${props.date}`} />
    </Head>
  );
  if (!events || events.length == 0) {
    return (
      <Fragment>
        {pageHeadData}
        <p>No events found for the chosen filter</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <p>Invalid filter.Please adjust filter values</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export default FilteredEvents;

export async function getServerSideProps(context) {
  const { params } = context;
  const reqData = params.slug;

  const filterYear = reqData[0];
  const filterMonth = reqData[1];

  const num_year = +filterYear;
  const num_month = +filterMonth;
  if (
    isNaN(num_month) ||
    isNaN(num_year) ||
    num_year > 2030 ||
    num_month < 1 ||
    num_month > 12
  ) {
    return {
      props: { hasError: true },
    };
  }
  const events = await getFilteredEvents({ year: num_year, month: num_month });
  return {
    props: {
      events: events,
      date: {
        year: num_year,
        month: num_month,
      },
    },
  };
}
