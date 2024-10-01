import moment from "moment";

const disablePastDates = (current: any) => {
  return current && current < moment().startOf("day");
};

export default disablePastDates;
