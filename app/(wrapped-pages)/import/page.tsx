'use client';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

function ImportBooks() {
  const [loading, setLoading] = useState(false);
  async function importBooks() {
    setLoading(true);
    try {
      const res = await fetch('api/import', {method: 'POST'});
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error import book (frontend)', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[69vh] gap-y-2 flex flex-col text-lg text-center justify-center">
      <h1 className="text-xl font-semibold">Import Books</h1>
      <Button
        disabled={loading}
        variant="destructive"
        className="text-center w-full max-w-md mx-auto text-md"
        onClick={() => importBooks()}
      >
        Import
      </Button>
    </div>
  );
}

export default ImportBooks;
