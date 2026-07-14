import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, User } from "lucide-react";
import { POSTS } from "@/constants/posts";
import PostCard from "@/components/features/PostCard";
import Newsletter from "@/components/features/Newsletter";

const AUTHOR_BIOS: Record<string, string> = {
  "Maya Chen":
    "Maya Chen is WorkShift's Future of Work Editor with a decade of experience covering distributed teams, async culture, and the evolving relationship between technology and human productivity. She has interviewed over 200 founders and executives on how they design the organizations of tomorrow.",
  "James Okafor":
    "James Okafor is a Workplace Policy Analyst who tracks legislation, corporate experiments, and academic research around alternative work arrangements. Before joining WorkShift, he advised HR departments at Fortune 500 companies on workforce transformation strategy.",
  "Sarah Lindström":
    "Sarah Lindström is a Remote Culture Specialist and organizational psychologist. She studies the social and psychological dynamics of distributed work — from loneliness and belonging to trust and psychological safety. She is based in Stockholm.",
  "David Park":
    "David Park is a Leadership Coach and former engineering director who now helps managers transition from supervision-based to outcomes-based leadership. His writing focuses on trust, autonomy, and the human side of organizational change.",
};

export default function AuthorPage() {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name ?? "");

  const authorPosts = POSTS.filter((p) => p.author.name === decodedName);

  if (authorPosts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="heading-serif text-3xl text-brand-navy dark:text-white mb-4">
          Author not found
        </h1>
        <p className="text-brand-muted mb-6">
          This author profile doesn't exist or may have changed.
        </p>
        <Link to="/blog" className="btn-primary">
          Browse All Articles
        </Link>
      </div>
    );
  }

  const author = authorPosts[0].author;
  const bio = AUTHOR_BIOS[decodedName] ?? `${decodedName} is a contributor at WorkShift.`;
  const categories = Array.from(new Set(authorPosts.map((p) => p.category)));

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-brand-muted text-sm hover:text-brand-teal transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> All Articles
      </Link>

      {/* Author Hero */}
      <div className="bg-gradient-to-br from-brand-navy to-[#1a3a5c] rounded-2xl px-6 py-10 sm:px-12 sm:py-14 text-white mb-12 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-brand-teal-light opacity-70" />
              <span className="text-brand-teal-light text-xs font-semibold uppercase tracking-widest opacity-80">
                Author
              </span>
            </div>
            <h1 className="heading-serif text-3xl sm:text-4xl text-white mb-1">
              {author.name}
            </h1>
            <p className="text-white/60 text-sm mb-4">{author.role}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-teal-light" />
                <span className="text-sm text-white/80">
                  <strong>{authorPosts.length}</strong>{" "}
                  {authorPosts.length === 1 ? "article" : "articles"} published
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/blog?category=${encodeURIComponent(cat)}`}
                    className="text-xs bg-white/10 hover:bg-brand-teal/30 text-white/70 hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="relative mt-6 text-white/70 text-sm leading-relaxed max-w-3xl border-t border-white/10 pt-6">
          {bio}
        </p>
      </div>

      {/* Articles by this author */}
      <div className="mb-12">
        <h2 className="heading-serif text-2xl text-brand-navy dark:text-white mb-6">
          Articles by {author.name.split(" ")[0]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
