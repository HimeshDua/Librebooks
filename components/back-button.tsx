'use client';

import {useRouter} from 'next/navigation';
import React from 'react';

interface BackButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function BackButton({className}: BackButtonProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      Go Back
    </button>
  );
}
