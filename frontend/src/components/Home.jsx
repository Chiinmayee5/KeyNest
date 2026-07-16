import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero.json";
import Footer from "../components/Footer";
import heroGif from "../assets/hero.gif";

const Home = () => {
    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-white to-teal-100">
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16">
                <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-6xl md:text-6xl font-extrabold mb-6 tracking-tight">
                            <span className="text-slate-900">Key</span>

                            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                                Nest
                            </span>
                        </h1>

                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Your Digital Password Vault
                        </h2>
                        <div className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl bg-white/90 backdrop-blur-md border border-teal-100 shadow-lg px-6 py-4 mb-10 transition-all duration-300 hover:shadow-xl">

                            <p className="text-center text-base md:text-md font-semibold tracking-wide text-gray-700">
                                🛡️ Trusted • Secure • Private
                            </p>

                        </div>


                        <div className="flex justify-center lg:justify-start gap-6">
                            <Link
                                to="/register"
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-400/50">
                                <>
                                    Get Started
                                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex justify-center">
                        <img
                            src={heroGif}
                            alt="Password Manager"
                            className="w-[380px] md:w-[360px] lg:w-[460px] object-contain"
                            draggable="false"
                        />
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">

                    <div className="bg-white text-center rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                        <div className="text-5xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                        <p className="text-gray-600">
                            Keep your passwords safe and accessible only to you.
                        </p>
                    </div>

                    <div className="bg-white text-center rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                        <div className="text-5xl  mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-2">Password Generator</h3>
                        <p className="text-gray-600">
                            Generate strong passwords instantly with one click.
                        </p>
                    </div>

                    <div className="bg-white text-center rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                        <div className="text-5xl mb-4">📂</div>
                        <h3 className="text-xl font-bold mb-2">Easy Organization</h3>
                        <p className="text-gray-600">
                            Organize your passwords using categories for quick access.
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;