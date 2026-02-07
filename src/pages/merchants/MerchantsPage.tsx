import MerchantTable from '@/components/tables/MerchantTable';
import { useMerchants } from '@/lib/queries';

const MerchantsPage = () => {
  const { data, isLoading, isError } = useMerchants();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-title">Merchants</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Merchant Management</h2>
      </div>
      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Active merchants</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">124</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Suspended</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">6</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Risk reviews</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">12</p>
          </div>
        </div>
      </div>
      {isLoading && <div className="card p-6 text-sm text-zinc-500 dark:text-zinc-400">Loading merchants...</div>}
      {isError && <div className="card p-6 text-sm text-red-600">Unable to load merchants.</div>}
      {!isLoading && !isError && <MerchantTable items={data?.merchants ?? []} />}
    </div>
  );
};

export default MerchantsPage;
