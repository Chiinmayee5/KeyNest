import { Link, useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight select-none"
        >
          <span className="text-white">Key</span>
          <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
            Nest
          </span>
        </Link>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          ← Back
        </button>

      </div>
    </nav>
  );
};

export default PublicNavbar;