import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem.js";

//Displays information of each day on the list
export default function DayList(props) {
  return (
    <ul>
      {props.days.map(day => (
        <DayListItem
        key = {day.id}
        name = {day.name}
        spots = {day.spots}
        selected = {day.name === props.value}
        setDay = {props.onChange}
        />
      ))}
    </ul>
  );
}