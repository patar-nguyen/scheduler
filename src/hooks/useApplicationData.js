import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {
  
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}));
    });

  }, []);
  
  //Once form is saved, interview will be displayed onto screen
  function bookInterview(id, interview, daysIndex) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };  
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    let newState = {...state};
    newState = {...newState, appointments: appointments}
    newState = {...newState, days: updateSpots(newState, daysIndex)};

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {setState({...newState});})
  }
  
  //User can cancel their appointment by clicking cancel button
  async function cancelInterview(id, daysIndex) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };  
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let newState = {...state};
    newState = {...newState, appointments: appointments}
    newState = {...newState, days: updateSpots(newState, daysIndex)};

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {setState({...newState});})
  }

  //Updates the amount of interview spots remaining for each day
  function updateSpots(state, daysIndex) {
    let days = [...state.days];
    let spots = 0;

    days[daysIndex].appointments.forEach((appointment) => {
      state.appointments[appointment].interview ? spots += 0 : spots += 1;
    });

    days[daysIndex].spots = spots;
    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}
