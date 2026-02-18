const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex justify-around items-center px-4 py-5 h-14">
        {/* Logo */}
        <div className="logo font-bold text-2xl flex items-center gap-1">
          <span className="text-green-400">&lt;</span>
          <span>PassOP</span>
          <span className="text-green-400">/&gt;</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-4">
          <li className="hover:text-green-400 cursor-pointer">Home</li>
          <li className="hover:text-green-400 cursor-pointer">About</li>
          <li className="hover:text-green-400 cursor-pointer">Contact</li>
        </ul>

        {/* Github Button */}
        <button className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition-colors ring-white ring-1">
          <img
            src="/icons/github.png"
            alt="github"
            className="w-6 h-6"
          />
          <span className="font-bold text-white">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

