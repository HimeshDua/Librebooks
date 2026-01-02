import Link from 'next/link';
import {Button} from '../ui/button';

function BookError({error, slug}: {error: string | null; slug: string}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background text-foreground">
      <h2 className="text-xl font-bold mb-2 text-destructive">Book not found</h2>
      <p className="text-sm text-muted-foreground">
        {error ?? `No book found related to ID: ${slug}`}
      </p>
      <Button asChild className="mt-6">
        <Link prefetch={true} href="/">
          ← Back to Library
        </Link>
      </Button>
    </div>
  );
}

export default BookError;
