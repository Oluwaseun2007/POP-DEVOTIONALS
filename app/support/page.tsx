'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [copied, setCopied] = useState(false);
  const accountNumber = '7049498814';

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">
        Support the Ministry
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          If you've been blessed by this devotional and feel led to give,
          your seed will help us continue reaching young people with the
          Gospel, producing more devotionals, and hosting worship meetings
          and outreaches.
        </p>

        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Give via Opay
          </h2>
          <div className="space-y-2 text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-3">
              <span className="font-medium">Account Number:</span>
              <span className="font-mono text-lg tracking-wider">
                {accountNumber}
              </span>
              <button
                onClick={copyAccountNumber}
                className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p>
              <span className="font-medium">Bank:</span> Opay
            </p>
            <p>
              <span className="font-medium">Account Name:</span> Anointed
              Igbadume Abbesiome
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Every gift, no matter how small, is a seed sown into a generation
          that seeks the face of God. Thank you for partnering with us.
        </div>

        <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-300">
          "Every man according as he purposeth in his heart, so let him give;
          not grudgingly, or of necessity: for God loveth a cheerful giver."
          <span className="block not-italic text-sm mt-1">— 2 Corinthians 9:7</span>
        </blockquote>
      </div>
    </div>
  );
}