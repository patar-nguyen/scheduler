//Retrieving all the appointments in a day
export function getAppointmentsForDay(state, day) {
  const filteredNames = state.days.filter(xday => xday.name === day);
  if(filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].appointments.map(id => state.appointments[id]);
  }
}
//Retrieves all the interviewers on a day
export function getInterviewersForDay(state, day) {
  const filteredNames = state.days.filter(xday => xday.name === day);
  if(filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].interviewers.map(id => state.interviewers[id]);
  }
}
//Retrieves information for a specific interview
export function getInterview(state, interview) {
  if(!interview) {
    return null;
  } else {
    return {...interview, interviewer: state.interviewers[interview.interviewer]}
  }
}