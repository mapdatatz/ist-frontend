const getTimeHrs = (startTime: Date, endTime: Date) => {
  const startJsDate = new Date(startTime);
  const endJsDate = new Date(endTime);
  const ms = endJsDate.getTime() - startJsDate.getTime();
  const hrs = (ms / (1000 * 60 * 60)).toFixed(2);
  const parsedHrs = parseFloat(hrs);
  return parsedHrs < 0 ? 0 : parsedHrs;
};

export default getTimeHrs;
