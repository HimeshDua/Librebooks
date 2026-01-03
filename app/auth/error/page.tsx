import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type AuthErrorProps = {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
};
export default async function ErrorPage({searchParams}: AuthErrorProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sorry, something went wrong.</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">Code error: {params.error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An unspecified error occurred. {params as any}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
