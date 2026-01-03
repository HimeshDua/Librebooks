'use client';

import {useSearchParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';

export default function ErrorPage() {
  const [error, setError] = useState('');
  useEffect(() => {
    const searchParams = useSearchParams();
    const errorLocal = searchParams.get('error');
    setError(errorLocal ?? '');
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sorry, something went wrong.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {error ? `Error: ${error}` : 'An unspecified error occurred.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
