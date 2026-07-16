import { useState } from "react";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleRegister = async () => {
  if (!form.name || !form.email || !form.password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const result = await registerUser(form);

    if (result.success) {
      toast.success(result.message);

      // Clear form
      setForm({
        name: "",
        email: "",
        password: "",
      });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } else {
      toast.error(result.message);
    }

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};
  return (
      <>
    <PublicNavbar />
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-md">

       <h1 className="text-5xl md:text-4xl font-extrabold tracking-tight mb-3 text-center">
    <span className="text-gray-900">Key</span>
    <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
        Nest
    </span>
</h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account 🚀
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-teal-400 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-teal-400 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-teal-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <span className="material-symbols-outlined text-gray-500">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>

        <button
  onClick={handleRegister}
 className="group inline-flex w-full justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-400/50"
>
  <>
    Register
    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
      
    </span>
</>
</button>

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
    </>
  );
}

export default Register;