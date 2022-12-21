import classes from "./Event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Image from "next/image";

function EventItem(props) {
  const HumanReadableDate = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatAddress = props.location.replace(",", "\n");
  const exploreLink = `/events/${props.id}`;
  return (
    <li className={classes.item}>
      <Image
        src={`/${props.image}`}
        alt={props.title}
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{HumanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formatAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Events</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
export default EventItem;
