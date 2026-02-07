import WebhookTable from '@/components/tables/WebhookTable';
import { useWebhooks } from '@/lib/queries';

const WebhooksPage = () => {
  const { data, isLoading, isError } = useWebhooks();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Webhooks</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Webhook Intake</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Incoming / hr</p>
          <p className="text-2xl font-semibold">1,280</p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Signature failures</p>
          <p className="text-2xl font-semibold">4</p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Deduped</p>
          <p className="text-2xl font-semibold">92</p>
        </div>
      </div>
      {isLoading && <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading webhooks...</div>}
      {isError && <div className="card p-6 text-sm text-red-600">Unable to load webhooks.</div>}
      {!isLoading && !isError && <WebhookTable items={data?.webhooks ?? []} />}
    </div>
  );
};

export default WebhooksPage;
