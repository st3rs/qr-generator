import type { AuditLog } from '@/types/data';
import { useMode } from '@/context/ModeContext';
import { redactPII } from '@/lib/masking';

interface AuditTableProps {
  items: AuditLog[];
}

const severityStyles: Record<AuditLog['severity'], string> = {
  info: 'badge-neutral',
  warning: 'badge-warning',
  critical: 'badge-danger'
};

const AuditTable = ({ items }: AuditTableProps) => {
  const { canMutate, isDemoMode } = useMode();
  const canExport = canMutate('export_data');
  const demoMode = isDemoMode();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audit & Error Logs</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">System events and admin actions</p>
        </div>
        {canExport && (
          <button className="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Export logs
          </button>
        )}
      </div>
      <table className="w-full text-left">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900">
          <tr>
            <th className="px-6 py-3">Actor</th>
            <th className="px-6 py-3">Action</th>
            <th className="px-6 py-3">Target</th>
            <th className="px-6 py-3">Timestamp</th>
            <th className="px-6 py-3">Severity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
          {items.map((log) => (
            <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
              <td className="px-6 py-4 font-semibold">
                {demoMode ? redactPII(log.actor) : log.actor}
              </td>
              <td className="px-6 py-4">{demoMode ? redactPII(log.action) : log.action}</td>
              <td className="px-6 py-4 font-mono text-xs">
                {demoMode ? redactPII(log.target) : log.target}
              </td>
              <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{log.createdAt}</td>
              <td className="px-6 py-4">
                <span className={`badge ${severityStyles[log.severity]}`}>{log.severity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;
