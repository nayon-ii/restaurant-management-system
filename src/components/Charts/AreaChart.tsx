// src/components/Charts/AreaChart.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaChartProps {
  data: Array<{ [key: string]: string | number }>;
  xDataKey: string;
  yDataKey: string;
  strokeColor: string;
  gradientId: string;
  gradientStart: string;
  gradientEnd: string;
  height?: number;
}

export default function CustomAreaChart({
  data,
  xDataKey,
  yDataKey,
  strokeColor,
  gradientId,
  gradientStart,
  gradientEnd,
  height = 300,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        <XAxis
          dataKey={xDataKey}
          stroke="#737373"
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke="#737373" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
          }}
        />
        <Area
          type="monotone"
          dataKey={yDataKey}
          stroke={strokeColor}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
