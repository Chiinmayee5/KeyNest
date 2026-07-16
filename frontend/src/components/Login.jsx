import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";
import PublicNavbar from "../components/PublicNavbar";


function Login() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleLogin = async () => {
  if (!form.email || !form.password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const result = await loginUser(form);

    if (result.success) {
      toast.success("Login Successful!");
    toast.success(`Welcome, ${result.user.name}!`);

      // Save JWT
      localStorage.setItem("token", result.token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirect to Password Manager
      setTimeout(() => {
       navigate("/dashboard");
      }, 1000);

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

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

       <h1 className="text-5xl md:text-4xl font-extrabold tracking-tight mb-3 text-center">
    <span className="text-gray-900">Key</span>
    <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
        Nest
    </span>
</h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Back !
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-teal-400 rounded-xl px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-teal-400 rounded-xl px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-teal-400"
        />

      <button
  onClick={handleLogin}
  className="group inline-flex w-full justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-400/50">
  <>
    Login
    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
        
    </span>
</>
</button>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?
          <Link
            to="/register"
            className="text-teal-600 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
    </>
  );
}

export default Login;