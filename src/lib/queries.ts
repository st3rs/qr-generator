import { useQuery } from '@tanstack/react-query';
import { apiClient, isApiEnabled } from '@/lib/apiClient';
import {
  auditLogs,
  merchants,
  settlements,
  transactions,
  webhookLogs,
  overview
} from '@/lib/mockData';
import { useMode } from '@/context/ModeContext';
import type {
  LogsResponse,
  MerchantsResponse,
  MerchantDetailResponse,
  OverviewResponse,
  SettlementsResponse,
  TransactionsResponse,
  WebhooksResponse
} from '@/types/data';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const queryKeys = {
  overview: ['overview'] as const,
  merchants: ['merchants'] as const,
  merchantDetail: (id: string) => ['merchant', id] as const,
  transactions: ['transactions'] as const,
  settlements: ['settlements'] as const,
  webhooks: ['webhooks'] as const,
  logs: ['logs'] as const
};

const withFallback = async <T>(apiCall: () => Promise<T>, fallback: T, forceMock: boolean) => {
  if (!isApiEnabled || forceMock) {
    await sleep(200);
    return fallback;
  }
  try {
    return await apiCall();
  } catch {
    return fallback;
  }
};

export const useOverview = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.overview, demoDataEnabled],
    queryFn: () =>
      withFallback<OverviewResponse>(
        async () => (await apiClient.get<OverviewResponse>('/admin/overview')).data,
        overview,
        demoDataEnabled
      )
  });
};
export const useMerchants = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.merchants, demoDataEnabled],
    queryFn: () =>
      withFallback<MerchantsResponse>(
        async () => (await apiClient.get<MerchantsResponse>('/admin/merchants')).data,
        { merchants },
        demoDataEnabled
      )
  });
};

export const useMerchantDetail = (merchantId: string) => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.merchantDetail(merchantId), demoDataEnabled],
    queryFn: () =>
      withFallback<MerchantDetailResponse>(
        async () => (await apiClient.get<MerchantDetailResponse>(`/admin/merchants/${merchantId}`)).data,
        {
          merchant: merchants.find((item) => item.id === merchantId) ?? merchants[0],
          recentTransactions: transactions
        },
        demoDataEnabled
      ),
    enabled: Boolean(merchantId)
  });
};

export const useTransactions = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.transactions, demoDataEnabled],
    queryFn: () =>
      withFallback<TransactionsResponse>(
        async () => (await apiClient.get<TransactionsResponse>('/admin/transactions')).data,
        { transactions },
        demoDataEnabled
      )
  });
};

export const useSettlements = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.settlements, demoDataEnabled],
    queryFn: () =>
      withFallback<SettlementsResponse>(
        async () => (await apiClient.get<SettlementsResponse>('/admin/settlements')).data,
        { settlements },
        demoDataEnabled
      )
  });
};

export const useWebhooks = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.webhooks, demoDataEnabled],
    queryFn: () =>
      withFallback<WebhooksResponse>(
        async () => (await apiClient.get<WebhooksResponse>('/admin/webhooks')).data,
        { webhooks: webhookLogs },
        demoDataEnabled
      )
  });
};

export const useAuditLogs = () => {
  const { demoDataEnabled } = useMode();
  return useQuery({
    queryKey: [...queryKeys.logs, demoDataEnabled],
    queryFn: () =>
      withFallback<LogsResponse>(
        async () => (await apiClient.get<LogsResponse>('/admin/logs')).data,
        { logs: auditLogs },
        demoDataEnabled
      )
  });
};
