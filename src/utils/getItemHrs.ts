import getTaskHrs from "./getTaskHrs";

const getItemHrs = (tasks: any) => {
  let hrs: any = 0;
  tasks?.forEach((task: any) => {
    hrs += getTaskHrs(task?.actions);
  });
  return parseFloat(hrs).toFixed(2)

};

export default getItemHrs;
