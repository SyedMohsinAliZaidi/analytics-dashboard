import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="mb-8">
          <p className="text-sm text-slate-500">Welcome to</p>
          <h1 className="text-3xl font-bold mt-1">Dedale Analytics</h1>
          <p className="text-slate-500 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 block mb-2">
            Username
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 block mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter password"
          />
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl py-3 font-semibold transition"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-xs text-slate-500 mt-5 text-center">
          Demo login: admin / admin
        </p>
      </form>
    </div>
  );
};

export default Login;