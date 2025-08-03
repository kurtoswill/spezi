"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get the token from the URL
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'email_confirmation') {
          setVerificationStatus('error');
          setErrorMessage('Invalid verification link. Please request a new verification email.');
          return;
        }

        // Verify the email using Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email'
        });

        if (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
          setErrorMessage(error.message || 'Failed to verify email. Please try again.');
        } else {
          setVerificationStatus('success');
          // Automatically redirect to login page after 5 seconds
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        }
      } catch (error) {
        console.error('Unexpected error during verification:', error);
        setVerificationStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {verificationStatus === 'loading' && (
          <div className="text-center">
            <Loader2 size={48} className="mx-auto text-[#232C4F] animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-[#232C4F] mb-2">Verifying Your Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="text-center">
            email verified
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="text-center">
            <XCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-[#232C4F] mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <div className="space-y-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-[#232C4F] text-white rounded-lg hover:bg-[#232C4F]/90 transition-colors"
              >
                Go to Login <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}