'use client';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';

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
    <div className="min-h-[69vh] gap-y-2 w-screen flex flex-col text-center justify-center">
      Import Books
      <Button
        disabled={loading}
        className="text-center w-fit mx-auto"
        onClick={() => importBooks()}
      >
        Import
      </Button>
    </div>
  );
}

export default ImportBooks;
