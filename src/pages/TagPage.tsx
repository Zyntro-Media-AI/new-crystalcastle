import { useParams, Link } from "react-router-dom";
import { Tag, ArrowRight } from "lucide-react";
import { POSTS } from "@/constants/posts";
import PostCard from "@/components/features/PostCard";

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const decodedTag = decodeURIComponent(tag ?? "");

  const posts = POSTS.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-teal/60 px-8 py-14 mb-12 text-center">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5">
            <Tag className="w-4 h-4 text-brand-teal-pale" />
            <span className="text-white/80 text-sm font-medium">Tag</span>
          </div>
          <h1 className="heading-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
            #{decodedTag}
          </h1>
          <p className="text-white/60 text-sm">
            {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with this topic
          </p>
        </div>
      </div>

      {/* Results */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brand-muted text-lg font-medium mb-2">
            No articles found for "#{decodedTag}"
          </p>
          <Link to="/blog" className="btn-primary mt-4 inline-flex">
            Browse All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
