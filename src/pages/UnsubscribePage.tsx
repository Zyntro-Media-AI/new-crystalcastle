import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Mail, CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "pending" | "loading" | "success" | "not_found" | "already" | "error";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";
  const [status, setStatus] = useState<Status>("pending");
  const [confirmed, setConfirmed] = useState(false);

  // Auto-confirm if email param is present and looks valid
  useEffect(() => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setConfirmed(true);
    }
  }, [email]);

  useEffect(() => {
    if (!confirmed || !email) return;

    const run = async () => {
      setStatus("loading");

      // Check if subscriber exists and isn't already unsubscribed
      const { data: existing, error: fetchError } = await supabase
        .from("subscribers")
        .select("id, unsubscribed_at")
        .eq("email", email)
        .maybeSingle();

      if (fetchError) {
        console.error("Unsubscribe fetch error:", fetchError);
        setStatus("error");
        return;
      }

      if (!existing) {
        setStatus("not_found");
        return;
      }

      if (existing.unsubscribed_at) {
        setStatus("already");
        return;
      }

      // Soft-delete: set unsubscribed_at
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq("email", email);

      if (updateError) {
        console.error("Unsubscribe update error:", updateError);
        setStatus("error");
        return;
      }

      setStatus("success");
    };

    run();
  }, [confirmed, email]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-brand-border dark:border-gray-700 rounded-2xl shadow-sm px-8 py-10 text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6">
            {status === "loading" && (
              <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-brand-teal animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
            )}
            {(status === "not_found" || status === "error") && (
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center">
                <XCircle className="w-7 h-7 text-rose-500" />
              </div>
            )}
            {(status === "already" || status === "pending") && (
              <div className="w-14 h-14 bg-brand-teal-pale rounded-2xl flex items-center justify-center">
                <Mail className="w-7 h-7 text-brand-teal" />
              </div>
            )}
          </div>

          {/* Content per status */}
          {status === "pending" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                Unsubscribe from WorkShift
              </h1>
              {email ? (
                <p className="text-brand-muted text-sm mb-2">
                  No email found in the link. Please use the unsubscribe link from your email.
                </p>
              ) : (
                <p className="text-brand-muted text-sm mb-2">
                  Please use the unsubscribe link sent in your email.
                </p>
              )}
            </>
          )}

          {status === "loading" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                Processing…
              </h1>
              <p className="text-brand-muted text-sm">
                Unsubscribing <span className="font-medium text-brand-charcoal dark:text-white">{email}</span>…
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                You're unsubscribed
              </h1>
              <p className="text-brand-muted text-sm leading-relaxed mb-1">
                <span className="font-medium text-brand-charcoal dark:text-white">{email}</span> has been
                removed from the WorkShift newsletter.
              </p>
              <p className="text-brand-subtle text-xs mb-7">
                You won't receive any more emails from us.
              </p>
              <Link to="/" className="btn-primary w-full justify-center">
                Back to WorkShift <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}

          {status === "already" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                Already unsubscribed
              </h1>
              <p className="text-brand-muted text-sm leading-relaxed mb-7">
                <span className="font-medium text-brand-charcoal dark:text-white">{email}</span> is
                already removed from our mailing list.
              </p>
              <Link to="/" className="btn-primary w-full justify-center">
                Back to WorkShift <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}

          {status === "not_found" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                Email not found
              </h1>
              <p className="text-brand-muted text-sm leading-relaxed mb-7">
                We couldn't find a subscription for{" "}
                <span className="font-medium text-brand-charcoal dark:text-white">{email}</span>. It may
                have already been removed or never subscribed.
              </p>
              <Link to="/" className="btn-outline w-full justify-center">
                Back to WorkShift
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <h1 className="heading-serif text-2xl text-brand-navy dark:text-white mb-3">
                Something went wrong
              </h1>
              <p className="text-brand-muted text-sm leading-relaxed mb-7">
                We couldn't process your request. Please try again or contact us at{" "}
                <a href="mailto:hello@workshift.co" className="text-brand-teal hover:underline">
                  hello@workshift.co
                </a>
                .
              </p>
              <button
                onClick={() => setConfirmed(false) as unknown as void || setConfirmed(true)}
                className="btn-primary w-full justify-center"
              >
                Try again
              </button>
            </>
          )}
        </div>

        {/* Footer note */}
        {status !== "success" && status !== "already" && (
          <p className="text-center text-brand-subtle text-xs mt-5">
            Changed your mind?{" "}
            <Link to="/" className="text-brand-teal hover:underline">
              Stay subscribed
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
