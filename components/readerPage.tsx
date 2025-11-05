"use client";

import { ReactReader } from "react-reader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReaderPage() {
  const { slug: id } = useParams();
  const [bookData, setBookData] = useState<ArrayBuffer | null>(null);
  const [location, setLocation] = useState<string | number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/readbook/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch book: ${res.status}`);

        const buffer = await res.arrayBuffer();
        setBookData(buffer);
      } catch (err) {
        console.error("Error loading EPUB:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!bookData) return <div className="p-6 text-muted-foreground">Loading book...</div>;

  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        // 👇 Pass the raw binary, NOT a blob URL
        url={bookData}
        location={location}
        locationChanged={setLocation}
      />
    </div>
  );
}
