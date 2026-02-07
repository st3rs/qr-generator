import AuditTable from '@/components/tables/AuditTable';
import { useAuditLogs } from '@/lib/queries';

const LogsPage = () => {
  const { data, isLoading, isError } = useAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Logs</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Audit & Error Logs</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">System actions</p>
          <p className="text-2xl font-semibold">482</p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin actions</p>
          <p className="text-2xl font-semibold">182</p>
        </div>
        <div className="card p-6">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Failed jobs</p>
          <p className="text-2xl font-semibold">6</p>
        </div>
      </div>
      {isLoading && <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading logs...</div>}
      {isError && <div className="card p-6 text-sm text-red-600">Unable to load logs.</div>}
      {!isLoading && !isError && <AuditTable items={data?.logs ?? []} />}
    </div>
  );
};

export default LogsPage;
