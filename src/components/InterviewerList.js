import React from "react";
import PropTypes from 'prop-types';
import InterviewListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

//Lists of available interviewers 
export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => (
          <InterviewListItem
          key = {interviewer.id}
          name = {interviewer.name}
          avatar = {interviewer.avatar}
          selected = {interviewer.id === props.value}
          setInterviewer = {() => props.onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};