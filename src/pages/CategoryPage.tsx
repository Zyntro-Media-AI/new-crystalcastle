import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { POSTS, CATEGORY_COLORS } from "@/constants/posts";
import PostCard from "@/components/features/PostCard";
import Newsletter from "@/components/features/Newsletter";
import { useEffect } from "react";
import { logAuditEvent } from "@/hooks/useAuditTrail";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Remote Work":
    "Distributed teams, home offices, and the cultural shift to location-independent work. How organizations manage people they never see in person.",
  "4-Day Week":
    "The growing movement to compress the workweek to four days without cutting pay — the evidence, the experiments, and the companies leading the way.",
  "Async Culture":
    "Defaulting to written communication, reducing real-time meetings, and designing organizations where deep work is the default, not the exception.",
  Leadership:
    "Managing by outcomes, not surveillance. The human skills, trust models, and coaching approaches that define effective leaders in modern organizations.",
  Productivity:
    "Systems, protocols, and habits that help knowledge workers produce their best work in a world of infinite distraction.",
  Wellbeing:
    "Structural approaches to employee health, burnout prevention, and building workplaces where people genuinely thrive — beyond perks and ping-pong tables.",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Remote Work": "from-blue-900 to-blue-700",
  "4-Day Week": "from-emerald-900 to-emerald-700",
  "Async Culture": "from-teal-900 to-teal-700",
  Leadership: "from-violet-900 to-violet-700",
  Productivity: "from-amber-900 to-amber-700",
  Wellbeing: "from-rose-900 to-rose-700",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = decodeURIComponent(slug ?? "");

  const posts = POSTS.filter((p) => p.category === categoryName);
  const colorClass = CATEGORY_COLORS[categoryName] || "bg-gray-100 text-gray-700";
  const gradient = CATEGORY_GRADIENTS[categoryName] || "from-brand-navy to-brand-navy-light";
  const description = CATEGORY_DESCRIPTIONS[categoryName] || `All articles in the ${categoryName} category.`;

  useEffect(() => {
    if (categoryName) {
      logAuditEvent({ type: "category_visited", label: categoryName });
    }
  }, [categoryName]);

  if (posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="heading-serif text-3xl text-brand-navy dark:text-white mb-4">
          Category not found
        </h1>
        <p className="text-brand-muted mb-6">
          No articles found for this category.
        </p>
        <Link to="/blog" className="btn-primary">
          Browse All Articles
        </Link>
      </div>
    );
  }

  const otherCategories = Object.keys(CATEGORY_COLORS).filter(
    (c) => c !== categoryName
  );

  return (
    <main>
      {/* Category Hero */}
      <section className={`relative bg-gradient-to-br ${gradient} py-16 sm:py-20 overflow-hidden`}>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              <span className={`tag-pill mb-4 ${colorClass}`}>
                {categoryName}
              </span>
              <h1 className="heading-serif text-3xl sm:text-5xl text-white leading-tight mb-4">
                {categoryName}
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            {/* Stat */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10 w-fit">
              <BookOpen className="w-5 h-5 text-white/70" />
              <div>
                <p className="text-2xl font-bold text-white leading-none">
                  {posts.length}
                </p>
                <p className="text-white/60 text-xs mt-0.5">
                  {posts.length === 1 ? "article" : "articles"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-brand-surface border-t border-brand-border py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-serif text-xl text-brand-navy dark:text-white mb-5">
            Explore Other Topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((cat) => {
              const cc = CATEGORY_COLORS[cat];
              return (
                <Link
                  key={cat}
                  to={`/category/${encodeURIComponent(cat)}`}
                  className={`tag-pill hover:opacity-80 transition-opacity ${cc}`}
                >
                  {cat} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Newsletter />
      </div>
    </main>
  );
}
