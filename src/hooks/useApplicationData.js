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
    // axios.get("/api/days")
    //   .then(response => setDays(response.data));
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };  
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    setState({...state, appointments: appointments});
  
    return axios.put(`/api/appointments/${id}`, {...appointment});
  }
  
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
