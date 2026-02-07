import type { WebhookLog } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { redactPII } from '@/lib/masking';

interface WebhookTableProps {
  items: WebhookLog[];
}

const WebhookTable = ({ items }: WebhookTableProps) => {
  const { canMutate, isDemoMode } = useMode();
  const canViewPayload = canMutate('view_payload');
  const demoMode = isDemoMode();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Webhook Intake</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Signature validation + deduplication</p>
        </div>
        {canViewPayload && (
          <button className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            View payload
          </button>
        )}
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900">
          <tr>
            <th className="px-6 py-3">Event</th>
            <th className="px-6 py-3">Provider</th>
            <th className="px-6 py-3">Signature</th>
            <th className="px-6 py-3">Deduplication</th>
            <th className="px-6 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          {items.map((log) => (
            <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-6 py-4 font-semibold">{log.id}</td>
              <td className="px-6 py-4">{demoMode ? redactPII(log.provider) : log.provider}</td>
              <td className="px-6 py-4">
                <span className={`badge ${log.signatureStatus === 'valid' ? 'badge-success' : 'badge-danger'}`}>
                  {log.signatureStatus}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`badge ${log.deduplication === 'accepted' ? 'badge-success' : 'badge-warning'}`}>
                  {log.deduplication}
                </span>
              </td>
              <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{log.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WebhookTable;
