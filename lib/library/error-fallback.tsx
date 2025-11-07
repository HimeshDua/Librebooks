import {Button} from '@/components/ui/button';

export function LibraryErrorFallback({error}: {error: string}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h2 className="text-lg font-semibold mb-2">Failed to load books</h2>
        <p className="text-sm text-destructive mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
