import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { StatusBreakdown } from '@/types/data';

const COLORS = ['var(--chart-success)', 'var(--chart-warning)', 'var(--chart-danger)'];

interface StatusPieChartProps {
  data: StatusBreakdown[];
}

const StatusPieChart = ({ data }: StatusPieChartProps) => (
  <div className="card p-6">
    <div className="mb-4">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Status breakdown</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Rolling 24h</p>
    </div>
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
      {data.map((item, index) => (
        <div key={item.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default StatusPieChart;
