"use client";

import { useEffect, useRef, useState } from "react";
import { searchMovies } from "@/lib/api";
import { Movie } from "@/lib/types";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function MovieSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchMovies(searchValue);
        setResults(data.results);
        setOpen(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={16} />
      </div>

      {/* Input */}
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Search movies..."
        className="w-full h-9 pl-10 pr-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl max-h-105 overflow-y-auto z-50 border-[#71717A] border  dark:bg-[#09090B]">
          {/* Loading */}
          {loading && (
            <div className="p-6 text-center text-gray-500">
              Searching movies...
            </div>
          )}

          {/* Empty */}
          {!loading && results.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No results found
            </div>
          )}

          {/* Results */}
          {!loading &&
            results.slice(0, 3).map((movie) => (
              <div key={movie.id}>
                <Link href={`/${movie.id}`} key={movie.id}>
                  <div
                    key={movie.id}
                    className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : "/no-poster.png"
                      }
                      alt={movie.title}
                      className="w-14 h-20 rounded-md object-cover"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold truncate">{movie.title}</p>
                      <p className="text-sm text-gray-500">
                        {movie.release_date?.slice(0, 4) || "—"} • ⭐{" "}
                        {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
                <div>
                  <Separator />
                </div>
              </div>
            ))}
          <div className="bg-gray-100 h-8">
            <Link
              href="./searchpage"
              className="flex justify-end font-semibold text-sm mr-5 pt-1"
            >
              {!loading && results?.length > 0 && "More movies results →"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
