import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    // ✅ STORE TOKEN (IMPORTANT)
    localStorage.setItem("token", data.token);

    navigate("/dashboard");
  } catch {
    alert("Invalid credentials");
  }
};

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          width: 300,
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 20 }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;