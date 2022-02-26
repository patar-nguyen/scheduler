import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {/* {props.time ? `Appointment at ${props.time}` : `No Appointments`} */}
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back}/>)}

    </article>
  );
}