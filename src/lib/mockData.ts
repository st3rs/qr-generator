import type {
  AuditLog,
  Merchant,
  MetricCard,
  Settlement,
  Transaction,
  WebhookLog,
  StatusBreakdown,
  VolumePoint,
  OverviewResponse
} from '@/types/data';

export const metricCards: MetricCard[] = [
  { label: 'Total Volume (THB)', value: '฿128.4M', change: '+6.2% WoW', trend: 'up' },
  { label: 'Total Settled USDT', value: '3.82M USDT', change: '+3.1% WoW', trend: 'up' },
  { label: 'Transactions Today', value: '18,420', change: '-2.3% DoD', trend: 'down' },
  { label: 'Failed / Pending', value: '312', change: '1.7% of total', trend: 'neutral' }
];

export const volumeSeries: VolumePoint[] = [
  { day: 'Mon', volume: 18.2 },
  { day: 'Tue', volume: 22.4 },
  { day: 'Wed', volume: 19.7 },
  { day: 'Thu', volume: 26.1 },
  { day: 'Fri', volume: 31.4 },
  { day: 'Sat', volume: 24.8 },
  { day: 'Sun', volume: 28.6 }
];

export const statusBreakdown: StatusBreakdown[] = [
  { name: 'Completed', value: 78 },
  { name: 'Pending', value: 14 },
  { name: 'Failed', value: 8 }
];

export const merchants: Merchant[] = [
  {
    id: 'm-001',
    name: 'Nova Commerce',
    status: 'active',
    promptPayId: '0105562987712',
    usdtWallet: 'TQ2a...7pLP',
    apiKey: 'sk_live_74...k92',
    riskTier: 'low'
  },
  {
    id: 'm-002',
    name: 'Atlas Travels',
    status: 'suspended',
    promptPayId: '0208473921123',
    usdtWallet: 'TRx9...3GJt',
    apiKey: 'sk_live_21...f19',
    riskTier: 'high'
  },
  {
    id: 'm-003',
    name: 'Brio Media',
    status: 'active',
    promptPayId: '0101243892212',
    usdtWallet: 'TQ4p...9JJv',
    apiKey: 'sk_live_11...aa9',
    riskTier: 'medium'
  }
];

export const transactions: Transaction[] = [
  {
    id: 't-1001',
    merchant: 'Nova Commerce',
    amountTHB: 12890,
    status: 'completed',
    createdAt: '2024-06-19 09:14',
    reference: 'PP-849102'
  },
  {
    id: 't-1002',
    merchant: 'Atlas Travels',
    amountTHB: 25990,
    status: 'pending',
    createdAt: '2024-06-19 09:20',
    reference: 'PP-849331'
  },
  {
    id: 't-1003',
    merchant: 'Brio Media',
    amountTHB: 6750,
    status: 'failed',
    createdAt: '2024-06-19 09:25',
    reference: 'PP-849552'
  }
];

export const settlements: Settlement[] = [
  {
    id: 's-301',
    amountTHB: 452000,
    amountUSDT: 12621.44,
    fee: 0.35,
    netAmount: 12577.27,
    txHash: '0xa81b...3c12',
    status: 'confirmed'
  },
  {
    id: 's-302',
    amountTHB: 325000,
    amountUSDT: 9050.22,
    fee: 0.3,
    netAmount: 9023.07,
    txHash: '0xb72a...2d99',
    status: 'pending'
  }
];

export const webhookLogs: WebhookLog[] = [
  {
    id: 'wh-881',
    provider: 'PromptPay Core',
    signatureStatus: 'valid',
    deduplication: 'accepted',
    createdAt: '2024-06-19 09:05'
  },
  {
    id: 'wh-882',
    provider: 'PromptPay Core',
    signatureStatus: 'invalid',
    deduplication: 'duplicate',
    createdAt: '2024-06-19 09:10'
  }
];

export const auditLogs: AuditLog[] = [
  {
    id: 'log-1199',
    actor: 'Sirin Panyarak',
    action: 'Retry settlement',
    target: 's-302',
    createdAt: '2024-06-19 09:30',
    severity: 'warning'
  },
  {
    id: 'log-1200',
    actor: 'System',
    action: 'Webhook signature mismatch',
    target: 'wh-882',
    createdAt: '2024-06-19 09:11',
    severity: 'critical'
  }
];

export const overview: OverviewResponse = {
  metrics: metricCards,
  volumeSeries,
  statusBreakdown,
  latestTransactions: transactions,
  alerts: [
    '3 pending settlements awaiting confirmations > 20 min.',
    '2 webhook signature failures in last hour.',
    'Liquidity buffer at 72% of daily target.'
  ]
};
