import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-7xl font-serif font-bold text-brand-teal mb-2">404</p>
        <h1 className="heading-serif text-2xl text-brand-navy mb-3">
          Page not found
        </h1>
        <p className="text-brand-muted text-sm mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
