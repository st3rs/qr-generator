import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from '@heroicons/react/24/outline';
import type { MetricCard as MetricCardType } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { maskAmountDisplay } from '@/lib/masking';

interface MetricCardProps {
  metric: MetricCardType;
}

const iconMap = {
  up: ArrowTrendingUpIcon,
  down: ArrowTrendingDownIcon,
  neutral: MinusIcon
};

const trendColor = {
  up: 'text-emerald-600',
  down: 'text-red-600',
  neutral: 'text-zinc-400'
};

const MetricCard = ({ metric }: MetricCardProps) => {
  const { isDemoMode } = useMode();
  const demoMode = isDemoMode();
  const Icon = iconMap[metric.trend];
  const value = demoMode ? maskAmountDisplay(metric.value) : metric.value;

  return (
    <div className="card p-5">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{metric.label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</p>
        <Icon className={`h-5 w-5 ${trendColor[metric.trend]}`} />
      </div>
      <p className={`mt-2 text-xs ${trendColor[metric.trend]}`}>{metric.change}</p>
    </div>
  );
};

export default MetricCard;
