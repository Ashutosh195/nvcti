import React from "react";
import EventCard from "./eventcard";
import {Container,Row} from 'react-bootstrap';

const Event = ({ events }) => {
    console.log("res", events);
    return (
        <div className="eventsContainer" style={{ backgroundColor: "#f8f8f8" }}>
            <Container className="events-card-container ">
                <Row className="news">
                {events.map((event) => {
                    return <EventCard key={event.id} {...event}></EventCard>;
                }
                )}
            </Row>
        </Container>
      </div >
    );
}

export default Event;

