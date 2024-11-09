import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { handleChartTotals } from "../../../api/payments";
import formatShort from "../../../utils/formatShort";

export default function MainChart({ year }: any) {
  const years = [year-8, year-7,year-6,year-5,year - 4, year - 3, year - 2, year - 1, year];
  const { data } = useQuery({
    queryKey: ["chartTotals"],
    queryFn: () => handleChartTotals({ years }),
  });

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#323232"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {formatShort(value)}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Expected" fill="#8884d8" background={{ fill: "#eee" }}>
          <LabelList dataKey="Expected" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="Paid" fill="#5BBC8F">
          <LabelList dataKey="Paid" content={renderCustomizedLabel} />
        </Bar>
        <Bar dataKey="Debt" fill="#f87171">
          <LabelList dataKey="Debt" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
