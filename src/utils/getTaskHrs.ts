import getTimeHrs from "./getTimeHrs";

const getTaskHrs = (actions: any) => {
  let hrs: any = 0;
  actions?.forEach((item: any) => {
    hrs += getTimeHrs(item.startTime, item.endTime);
  });
  return parseFloat(hrs).toFixed(2)
};

export default getTaskHrs;
