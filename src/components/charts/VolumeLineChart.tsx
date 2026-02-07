import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import type { VolumePoint } from '@/types/data';

interface VolumeLineChartProps {
  data: VolumePoint[];
}

const VolumeLineChart = ({ data }: VolumeLineChartProps) => (
  <div className="card p-6">
    <div className="mb-4">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Volume per day (THB)</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Last 7 days</p>
    </div>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          <XAxis dataKey="day" tick={{ fill: 'var(--chart-axis)' }} />
          <YAxis tick={{ fill: 'var(--chart-axis)' }} />
          <Tooltip />
          <Line type="monotone" dataKey="volume" stroke="var(--chart-line)" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default VolumeLineChart;
