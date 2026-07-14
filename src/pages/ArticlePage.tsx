import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Bookmark } from "lucide-react";
import { POSTS, CATEGORY_COLORS } from "@/constants/posts";
import Newsletter from "@/components/features/Newsletter";
import PostCard from "@/components/features/PostCard";
import ReadingProgressBar from "@/components/features/ReadingProgressBar";
import TableOfContents from "@/components/features/TableOfContents";
import ShareButtons from "@/components/features/ShareButtons";
import CommentSection from "@/components/features/CommentSection";
import { useArticleAudit } from "@/hooks/useAuditTrail";
import { useReadingList } from "@/hooks/useReadingList";
import { toast } from "sonner";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = POSTS.find((p) => p.slug === slug);

  // Audit trail — log this article view
  useArticleAudit(post?.slug ?? "", post?.title ?? "");
  const { bookmarked, toggle: toggleBookmark } = useReadingList(post?.slug ?? "");

  const handleBookmark = () => {
    toggleBookmark();
    toast.success(bookmarked ? "Removed from reading list" : "Saved to reading list");
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="heading-serif text-3xl text-brand-navy mb-4">
          Article not found
        </h1>
        <p className="text-brand-muted mb-6">
          This article doesn't exist or may have been moved.
        </p>
        <Link to="/blog" className="btn-primary">
          Browse All Articles
        </Link>
      </div>
    );
  }

  const related = POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category
  ).slice(0, 2);

  const categoryColor = CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-700";

  return (
    <main className="dark:bg-gray-950">
      <ReadingProgressBar />
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-muted text-sm hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Hero image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="rounded-2xl overflow-hidden aspect-[21/9] shadow-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article + ToC layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-12 items-start">
        <TableOfContents content={post.content} />

      {/* Article */}
      <article className="flex-1 min-w-0 max-w-2xl mx-auto">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className={`tag-pill ${categoryColor}`}>{post.category}</span>
          <span className="flex items-center gap-1 text-brand-subtle text-xs">
            <Clock className="w-3 h-3" /> {post.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-brand-subtle text-xs">
            <Calendar className="w-3 h-3" /> {post.publishedAt}
          </span>
        </div>

        <h1 className="heading-serif text-3xl sm:text-4xl text-brand-navy leading-tight mb-5">
          {post.title}
        </h1>

        <p className="text-brand-muted text-lg leading-relaxed mb-8 font-medium">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 py-5 border-y border-brand-border dark:border-gray-700 mb-8">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/authors/${encodeURIComponent(post.author.name)}`}
              className="font-semibold text-brand-charcoal dark:text-white text-sm hover:text-brand-teal transition-colors"
            >
              {post.author.name}
            </Link>
            <p className="text-brand-subtle text-xs">{post.author.role}</p>
          </div>
        </div>

        {/* Article body */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bookmark + Share row */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all ${
              bookmarked
                ? "bg-brand-teal-pale border-brand-teal text-brand-teal"
                : "border-brand-border text-brand-muted hover:border-brand-teal hover:text-brand-teal"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            {bookmarked ? "Saved" : "Save to Reading List"}
          </button>
        </div>
        <ShareButtons title={post.title} slug={post.slug} />

        {/* Comments */}
        <CommentSection slug={post.slug} />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-brand-border">
          <Tag className="w-4 h-4 text-brand-subtle" />
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${encodeURIComponent(tag)}`}
              className="text-xs bg-brand-surface border border-brand-border text-brand-muted hover:border-brand-teal hover:text-brand-teal px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </article>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-brand-surface border-t border-brand-border py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-7">
              <h2 className="heading-serif text-2xl text-brand-navy">
                More in {post.category}
              </h2>
              <Link
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="flex items-center gap-1 text-brand-teal text-sm font-semibold hover:underline"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Newsletter />
      </div>
    </main>
  );
}
