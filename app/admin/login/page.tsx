"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
      padding: "20px",
      fontFamily: "var(--font-montserrat), sans-serif"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        color: "#fff"
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.5px" }}>
          Playhouse <span style={{ color: "#FF6B35" }}>CMS</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "32px" }}>
          Enter your email and password to log in.
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="email" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px", color: "rgba(255,255,255,0.7)" }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@playhousenursery.ae"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#FF6B35"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label htmlFor="password" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px", color: "rgba(255,255,255,0.7)" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#FF6B35"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {error && (
            <div style={{
              background: "rgba(239, 83, 80, 0.1)",
              border: "1px solid rgba(239, 83, 80, 0.3)",
              color: "#EF5350",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              textAlign: "left"
            }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: "8px" }} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              background: "#FF6B35",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(255, 107, 53, 0.2)",
              fontSize: "0.95rem"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#e05822"}
            onMouseOut={(e) => e.currentTarget.style.background = "#FF6B35"}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
