import EventItem from "./Event-item";
import classes from "./Event-list.module.css";
function EventList(props) {
  return (
    <ul className={classes.list}>
      {props.items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          location={item.location}
          date={item.date}
        />
      ))}
    </ul>
  );
}
export default EventList;
