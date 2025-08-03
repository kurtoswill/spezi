import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const VerifyEmailClient = dynamic(() => import('./VerifyEmailClient'), { ssr: false });

export default function Page() {
  return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <VerifyEmailClient />
      </Suspense>
  );
}
