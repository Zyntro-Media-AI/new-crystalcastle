import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Zap, Heart } from "lucide-react";
import Newsletter from "@/components/features/Newsletter";
import { POSTS } from "@/constants/posts";

const team = [
  {
    name: "Maya Chen",
    role: "Future of Work Editor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    bio: "Maya covers emerging work paradigms and has interviewed over 200 founders and executives on how they're redesigning their organizations.",
  },
  {
    name: "James Okafor",
    role: "Workplace Policy Analyst",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    bio: "James tracks policy developments, academic research, and legislative changes affecting how companies define and measure work.",
  },
  {
    name: "Sarah Lindström",
    role: "Remote Culture Specialist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    bio: "Sarah focuses on the human dimension of remote and hybrid work — wellbeing, belonging, and the social architecture of distributed teams.",
  },
  {
    name: "David Park",
    role: "Leadership Coach",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    bio: "David works with CEOs and management teams transitioning to outcome-based leadership models, writing from direct coaching experience.",
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Evidence-First",
    description:
      "We cite studies, real data, and case studies — not just opinions. Every claim is grounded in something you can verify.",
  },
  {
    icon: Zap,
    title: "Actionable by Design",
    description:
      "We don't just describe trends — we give you the frameworks and protocols to act on them in your own organization.",
  },
  {
    icon: Heart,
    title: "Human-Centered",
    description:
      "New work systems must work for people, not just for productivity metrics. Wellbeing and dignity are always part of our analysis.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="tag-pill bg-brand-teal/20 text-brand-teal-light mb-5 inline-flex">
            About WorkShift
          </span>
          <h1 className="heading-serif text-4xl sm:text-5xl leading-tight mb-5">
            We cover the systems reshaping how humanity works
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            WorkShift was founded on a simple belief: that how we work is
            changing faster than the mainstream conversation acknowledges —
            and that the people at the frontier deserve rigorous, honest
            reporting on what's working and what isn't.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="heading-serif text-2xl sm:text-3xl text-brand-navy text-center mb-10">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-brand-border rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 bg-brand-teal-pale rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="heading-serif text-lg text-brand-navy mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-surface border-y border-brand-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-serif text-2xl sm:text-3xl text-brand-navy text-center mb-10">
            Meet the team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-5 border border-brand-border shadow-sm text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-brand-teal-pale"
                />
                <h3 className="font-semibold text-brand-navy text-sm">{member.name}</h3>
                <p className="text-brand-teal text-xs font-medium mb-2">{member.role}</p>
                <p className="text-brand-muted text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: `${POSTS.length}+`, label: "Articles published" },
            { value: "12K+", label: "Newsletter subscribers" },
            { value: "4", label: "Expert contributors" },
            { value: "2024", label: "Founded" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white border border-brand-border rounded-xl p-5 shadow-sm">
              <p className="heading-serif text-3xl text-brand-teal mb-1">{value}</p>
              <p className="text-brand-muted text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-surface border-t border-brand-border py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="heading-serif text-2xl text-brand-navy mb-3">
            Ready to explore?
          </h2>
          <p className="text-brand-muted text-sm mb-6">
            Browse our full archive of articles on remote work, 4-day weeks,
            async culture, and more.
          </p>
          <Link to="/blog" className="btn-primary">
            Browse All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Newsletter />
      </div>
    </main>
  );
}
