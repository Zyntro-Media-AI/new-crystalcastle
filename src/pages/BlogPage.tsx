import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { POSTS, CATEGORIES, CATEGORY_COLORS } from "@/constants/posts";
import PostCard from "@/components/features/PostCard";

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="heading-serif text-3xl sm:text-4xl text-brand-navy mb-3">
          All Articles
        </h1>
        <p className="text-brand-muted leading-relaxed max-w-xl">
          Ideas and evidence on the systems, leadership models, and cultural
          shifts defining the new world of work.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" />
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-brand-border rounded-lg text-sm bg-white text-brand-charcoal placeholder-brand-subtle focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal"
        />
      </div>

      {/* Mobile category quick-access horizontal scroll */}
      <div className="sm:hidden -mx-4 px-4 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-2 w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat !== "All" ? CATEGORY_COLORS[cat] : "";
            return (
              <button
                key={`mobile-${cat}`}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? cat === "All"
                      ? "bg-brand-navy text-white border-brand-navy"
                      : `${color} border-transparent ring-2 ring-offset-1 ring-current`
                    : "bg-white border-brand-border text-brand-muted hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Category Filter */}
      <div className="hidden sm:flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const color = cat !== "All" ? CATEGORY_COLORS[cat] : "";
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`tag-pill transition-all duration-150 cursor-pointer ${
                isActive
                  ? cat === "All"
                    ? "bg-brand-navy text-white"
                    : `${color} ring-2 ring-offset-1 ring-current`
                  : cat === "All"
                  ? "bg-brand-surface text-brand-charcoal hover:bg-brand-navy hover:text-white"
                  : `${color} opacity-60 hover:opacity-100`
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brand-muted text-lg">No articles found.</p>
          <p className="text-brand-subtle text-sm mt-1">
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <>
          <p className="text-brand-subtle text-sm mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
