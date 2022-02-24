import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  return (
    <article className="appointment">
      {/* {props.time ? `Appointment at ${props.time}` : `No Appointments`} */}
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}

    </article>
  );
}