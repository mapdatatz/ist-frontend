import getItemHrs from "./getItemHrs";

const getJobHrs = (items: any) => {
  let hrs: any = 0;
  items?.forEach((item: any) => {
    hrs += getItemHrs(item?.tasks);
  });
  return parseFloat(hrs).toFixed(2)
  
};

export default getJobHrs;
