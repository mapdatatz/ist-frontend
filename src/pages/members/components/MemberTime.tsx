export default function MemberTime({date1, date2}: any) {
  function getTimeDiff(date1: any, date2: any) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the year and month difference
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();

    // Adjust the values if necessary
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  }

  const { years, months } = getTimeDiff(date1, date2);

  return (
    <div>
      {years ? `${years} Year(s)` : null} {months ? `${months} Month(s)` : "Less than a month"}
    </div>
  );
}
