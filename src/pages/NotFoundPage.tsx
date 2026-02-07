import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <div>
      <p className="section-title">404</p>
      <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Page not found</h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">The route you requested does not exist.</p>
    </div>
    <Link
      to="/dashboard"
      className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
    >
      Back to dashboard
    </Link>
  </div>
);

export default NotFoundPage;
