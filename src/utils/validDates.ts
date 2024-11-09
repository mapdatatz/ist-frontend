import moment from "moment";

const validDates = (current: any) => {
    return current && current > moment().endOf('day');
};
export default validDates;