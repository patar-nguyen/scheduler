import { startSession } from "pg/lib/sasl";

export function getAppointmentsForDay(state, day) {
  const filteredNames = state.days.filter(xday => xday.name === day);
  if(filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].appointments.map(id => state.appointments[id]);
  }
}

export function getInterviewersForDay(state, day) {
  const filteredNames = state.days.filter(xday => xday.name === day);
  if(filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].interviewers.map(id => state.interviewers[id]);
  }
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  } else {
    return {...interview, interviewer: state.interviewers[interview.interviewer]}
  }
}