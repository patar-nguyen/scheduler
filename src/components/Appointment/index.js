import React, {useEffect} from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETING";
  const CONFIRM = "CONFIRMATION";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  let daysIndex;
  //Sets the day index depending on the day
  if(props.day === "Monday") {
    daysIndex = 0;
  } else if (props.day === "Tuesday") {
    daysIndex = 1;
  } else if (props.day === "Wednesday") {
    daysIndex = 2;
  } else if (props.day === "Thursday") {
    daysIndex = 3;
  } else if (props.day === "Friday") {
    daysIndex = 4;
  }

  useEffect(() => {
    console.log(props.interview);
  }, [props.interview])

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Saving interview after filling out the form 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview, daysIndex)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //Delete an interview
  function destroy(event) {
    transition(DELETE, true);
    props
     .cancelInterview(props.id, daysIndex)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }
   

  return (
    <article className="appointment">
      {/* {props.time ? `Appointment at ${props.time}` : `No Appointments`} */}
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={back} onConfirm={() => {destroy(props.id)}} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === ERROR_SAVE && <Error message="Cannot save" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Cannot delete" onClose={back}/>}

    </article>
  );
}