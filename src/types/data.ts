export interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface VolumePoint {
  day: string;
  volume: number;
}

export interface StatusBreakdown {
  name: string;
  value: number;
}

export interface Merchant {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  promptPayId: string;
  usdtWallet: string;
  apiKey: string;
  riskTier: 'low' | 'medium' | 'high';
}

export interface Transaction {
  id: string;
  merchant: string;
  amountTHB: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  reference: string;
}

export interface Settlement {
  id: string;
  amountTHB: number;
  amountUSDT: number;
  fee: number;
  netAmount: number;
  txHash: string;
  status: 'confirmed' | 'pending' | 'failed';
}

export interface WebhookLog {
  id: string;
  provider: string;
  signatureStatus: 'valid' | 'invalid';
  deduplication: 'accepted' | 'duplicate';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface OverviewResponse {
  metrics: MetricCard[];
  volumeSeries: VolumePoint[];
  statusBreakdown: StatusBreakdown[];
  latestTransactions: Transaction[];
  alerts: string[];
}

export interface MerchantsResponse {
  merchants: Merchant[];
}

export interface MerchantDetailResponse {
  merchant: Merchant;
  recentTransactions: Transaction[];
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface SettlementsResponse {
  settlements: Settlement[];
}

export interface WebhooksResponse {
  webhooks: WebhookLog[];
}

export interface LogsResponse {
  logs: AuditLog[];
}
