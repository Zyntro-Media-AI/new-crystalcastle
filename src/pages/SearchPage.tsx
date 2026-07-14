import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { POSTS, CATEGORY_COLORS } from "@/constants/posts";
import { logAuditEvent } from "@/hooks/useAuditTrail";

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-brand-teal/20 text-brand-teal rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync URL
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        setSearchParams({ q: query });
        if (query.trim().length >= 3) {
          logAuditEvent({ type: "search_performed", label: query.trim() });
        }
      } else {
        setSearchParams({});
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [query, setSearchParams]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q)
    );
  }, [query]);

  const categoryColor = (cat: string) =>
    CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-700";

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-serif text-3xl sm:text-4xl text-brand-navy dark:text-white mb-2">
          Search Articles
        </h1>
        <p className="text-brand-muted text-sm">
          Search across titles, excerpts, tags, categories, and authors.
          <span className="ml-2 px-1.5 py-0.5 bg-brand-surface border border-brand-border rounded text-xs font-mono text-brand-subtle">
            ⌘K
          </span>
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-subtle" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles, topics, or authors..."
          className="w-full pl-12 pr-12 py-4 text-base border-2 border-brand-border focus:border-brand-teal rounded-xl bg-white dark:bg-gray-900 text-brand-charcoal dark:text-white placeholder-brand-subtle focus:outline-none focus:ring-4 focus:ring-brand-teal/10 shadow-sm transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-brand-subtle hover:text-brand-charcoal hover:bg-brand-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Empty state */}
      {!query.trim() && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-brand-teal-pale rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Search className="w-7 h-7 text-brand-teal" />
          </div>
          <p className="text-brand-muted text-lg font-medium mb-2">
            What are you looking for?
          </p>
          <p className="text-brand-subtle text-sm max-w-sm mx-auto">
            Try searching for "remote work", "4-day week", "async", or an
            author's name.
          </p>
          {/* Suggested topics */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["remote work", "async", "leadership", "wellbeing", "4-day week"].map((topic) => (
              <button
                key={topic}
                onClick={() => setQuery(topic)}
                className="text-sm px-4 py-2 bg-white border border-brand-border rounded-full text-brand-muted hover:border-brand-teal hover:text-brand-teal transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {query.trim() && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-brand-muted text-lg font-medium mb-1">
            No results for "{query}"
          </p>
          <p className="text-brand-subtle text-sm">
            Try a different keyword or browse{" "}
            <Link to="/blog" className="text-brand-teal hover:underline">
              all articles
            </Link>
            .
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="text-brand-subtle text-sm mb-5">
            <strong className="text-brand-charcoal dark:text-white">{results.length}</strong>{" "}
            result{results.length !== 1 ? "s" : ""} for "
            <span className="text-brand-teal">{query}</span>"
          </p>
          <div className="space-y-4">
            {results.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex gap-4 bg-white dark:bg-gray-900 border border-brand-border dark:border-gray-700 rounded-xl p-5 hover:border-brand-teal hover:shadow-md transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`tag-pill text-[10px] py-0.5 px-2 ${categoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-brand-subtle text-xs">
                      <Clock className="w-3 h-3" /> {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-brand-navy dark:text-white leading-snug mb-1 group-hover:text-brand-teal transition-colors line-clamp-2">
                    {highlight(post.title, query)}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed line-clamp-2 hidden sm:block">
                    {highlight(post.excerpt, query)}
                  </p>
                </div>
                <div className="self-center shrink-0 text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
