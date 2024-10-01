import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PaidPercentage = ({  metrics, year, pathColor }: any) => {
  const percentage = Number(
    ((metrics?.Paid / metrics?.Expected) * 100).toFixed()
  );
  return (
    <div style={{ width: "100px", height: "100px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        styles={buildStyles({
          textColor: "#000",
          pathColor: pathColor,
          trailColor: "#d6d6d6",
          textSize: 25,
          rotation: 1 / 2 + 1 / 8,
        })}
      />
    </div>
  );
};

export default PaidPercentage;
