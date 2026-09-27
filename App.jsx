import { useEffect, useState } from "react";
import {
  LogOut,
  LockKeyhole,
  UserPlus,
  Mail,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { supabase } from "./lib/supabase";

function getGreeting() {
  // Uses the visitor's computer/browser local time.
  const hour = new Date().getHours();

  return hour < 12 ? "Good Morning" : "Good Evening";
}

function AuthShell({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
              <LockKeyhole size={28} />
            </div>

            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="mt-2 text-sm text-slate-300">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          required={required}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-11 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </label>
  );
}

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      onLogin(data.session);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!resetEmail.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      resetEmail.trim(),
      {
        redirectTo: window.location.origin,
      }
    );

    setResetLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      "Password reset link has been sent to your email."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(!showForgotPassword);
                  setError("");
                  setSuccess("");
                }}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password Section */}
          {showForgotPassword && (
            <div className="mt-6 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">

              <h2 className="text-lg font-bold text-slate-900">
                Reset Password
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your registered email address.
              </p>

              <form
                onSubmit={handleForgotPassword}
                className="mt-4"
              >
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) =>
                    setResetEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  disabled={resetLoading}
                  className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {resetLoading
                    ? "Sending..."
                    : "Send Reset Link"}
                </button>
              </form>
            </div>
          )}

          {/* Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-blue-600 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function Register({ onSwitch, onRegistered }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    const { data, error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

    if (signUpError) {
      setError(signUpError.message);
      setBusy(false);
      return;
    }

    if (data.session && data.user) {
      onRegistered(data.user);
    } else {
      setError(
        "Account created. Please confirm your email, then login."
      );
    }

    setBusy(false);
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Register a new user with Supabase Authentication"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          icon={User}
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John"
        />

        <Input
          icon={Mail}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />

        <Input
          icon={LockKeyhole}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />

        <Input
          icon={LockKeyhole}
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Repeat your password"
        />

        {error && (
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-100">
            {error}
          </div>
        )}

        <button
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlus size={18} />

          {busy
            ? "Creating account..."
            : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="font-semibold text-indigo-300 hover:text-indigo-200"
        >
          Login
        </button>
      </p>
    </AuthShell>
  );
}

function Home({ user, onLogout }) {
  const [name, setName] = useState(
    user.user_metadata?.full_name || "User"
  );

  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [saving, setSaving] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [showChangePassword, setShowChangePassword] =
    useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] =
    useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (!error && data?.full_name) {
        setName(data.full_name);
      }
    };

    loadProfile();
  }, [user.id]);

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >

      {/* ================= NAVBAR ================= */}
      <nav
        className={`border-b shadow-sm ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <div>
            <h1
              className={`text-xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              AuthNexa
            </h1>

            <p
              className={
                darkMode
                  ? "text-xs text-slate-400"
                  : "text-xs text-slate-500"
              }
            >
              User Dashboard
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* User Details */}
            <div className="hidden text-right sm:block">
              <p
                className={`text-sm font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-800"
                }`}
              >
                {name}
              </p>

              <p
                className={
                  darkMode
                    ? "text-xs text-slate-400"
                    : "text-xs text-slate-500"
                }
              >
                {user.email}
              </p>
            </div>

            {/* Dark / Light Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                darkMode
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={17} />
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* ================= DASHBOARD ================= */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Dashboard Header */}
        <div className="mb-8">

          <p
            className={
              darkMode
                ? "text-sm font-medium text-slate-400"
                : "text-sm font-medium text-slate-500"
            }
          >
            Welcome back
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            {getGreeting()}, {name} 👋
          </h2>

          <p
            className={
              darkMode
                ? "mt-2 text-slate-300"
                : "mt-2 text-slate-600"
            }
          >
            Here is your account dashboard.
          </p>

        </div>

        {/* ================= CARDS ================= */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* ================= PROFILE CARD ================= */}
          <div
            className={`rounded-2xl p-6 shadow-sm ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
            }`}
          >

            <div className="mb-4 text-3xl">
              👤
            </div>

            <h3
              className={`text-lg font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Profile
            </h3>

            <p
              className={
                darkMode
                  ? "mt-2 text-sm text-slate-300"
                  : "mt-2 text-sm text-slate-500"
              }
            >
              View your account information.
            </p>

            {/* Edit Profile Button */}
            <button
              onClick={() => {
                setEditName(name);
                setShowEdit(true);
              }}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>

            {/* Edit Profile Section */}
            {showEdit && (
              <div
                className={`mt-5 rounded-xl p-4 ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-slate-50"
                }`}
              >

                <label
                  className={
                    darkMode
                      ? "text-sm font-medium text-slate-300"
                      : "text-sm font-medium text-slate-700"
                  }
                >
                  Full Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500 ${
                    darkMode
                      ? "border-slate-600 bg-slate-700 text-white placeholder:text-slate-400"
                      : "border-slate-300 bg-white text-slate-900"
                  }`}
                  placeholder="Enter your name"
                />

                <div className="mt-4 flex gap-2">

                  {/* Save */}
                  <button
                    disabled={saving}
                    onClick={async () => {
                      if (!editName.trim()) return;

                      setSaving(true);

                      const { error } =
                        await supabase
                          .from("profiles")
                          .update({
                            full_name:
                              editName.trim(),
                          })
                          .eq("id", user.id);

                      if (!error) {
                        setName(editName.trim());

                        await supabase.auth.updateUser({
                          data: {
                            full_name:
                              editName.trim(),
                          },
                        });

                        setShowEdit(false);
                      } else {
                        alert(error.message);
                      }

                      setSaving(false);
                    }}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>

                  {/* Cancel */}
                  <button
                    onClick={() =>
                      setShowEdit(false)
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      darkMode
                        ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    Cancel
                  </button>

                </div>
              </div>
            )}

            {/* Name */}
            <div className="mt-5">

              <p
                className={
                  darkMode
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-500"
                }
              >
                Name
              </p>

              <p
                className={
                  darkMode
                    ? "font-semibold text-white"
                    : "font-semibold text-slate-900"
                }
              >
                {name}
              </p>

            </div>

          </div>

          {/* ================= ACCOUNT CARD ================= */}
          <div
            className={`rounded-2xl p-6 shadow-sm ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
            }`}
          >

            <div className="mb-4 text-3xl">
              🔐
            </div>

            <h3
              className={`text-lg font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Account
            </h3>

            <p
              className={
                darkMode
                  ? "mt-2 text-sm text-slate-300"
                  : "mt-2 text-sm text-slate-500"
              }
            >
              Your account is authenticated securely
              using Supabase.
            </p>

            {/* Status */}
            <div className="mt-5">

              <p
                className={
                  darkMode
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-500"
                }
              >
                Status
              </p>

              <p className="font-semibold text-green-500">
                ● Active
              </p>

              {/* Change Password Button */}
              <button
                onClick={() => {
                  setShowChangePassword(
                    !showChangePassword
                  );
                  setPasswordMessage("");
                }}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Change Password
              </button>

              {/* Change Password Section */}
              {showChangePassword && (
                <div
                  className={`mt-4 rounded-xl p-4 ${
                    darkMode
                      ? "bg-slate-800"
                      : "bg-slate-50"
                  }`}
                >

                  <label
                    className={
                      darkMode
                        ? "text-sm font-medium text-slate-300"
                        : "text-sm font-medium text-slate-700"
                    }
                  >
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className={`mt-2 w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500 ${
                      darkMode
                        ? "border-slate-600 bg-slate-700 text-white placeholder:text-slate-400"
                        : "border-slate-300 bg-white text-slate-900"
                    }`}
                  />

                  {/* Update Password */}
                  <button
                    onClick={async () => {
                      if (newPassword.length < 6) {
                        setPasswordMessage(
                          "Password must contain at least 6 characters."
                        );
                        return;
                      }

                      const { error } =
                        await supabase.auth.updateUser({
                          password: newPassword,
                        });

                      if (error) {
                        setPasswordMessage(
                          error.message
                        );
                      } else {
                        setPasswordMessage(
                          "Password changed successfully!"
                        );

                        setNewPassword("");
                      }
                    }}
                    className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Update Password
                  </button>

                  {/* Password Message */}
                  {passwordMessage && (
                    <p
                      className={
                        darkMode
                          ? "mt-3 text-sm text-slate-300"
                          : "mt-3 text-sm text-slate-600"
                      }
                    >
                      {passwordMessage}
                    </p>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* ================= EMAIL CARD ================= */}
          <div
            className={`rounded-2xl p-6 shadow-sm ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
            }`}
          >

            <div className="mb-4 text-3xl">
              ✉️
            </div>

            <h3
              className={`text-lg font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Email
            </h3>

            <p
              className={
                darkMode
                  ? "mt-2 text-sm text-slate-300"
                  : "mt-2 text-sm text-slate-500"
              }
            >
              Your registered email address.
            </p>

            <div className="mt-5">

              <p
                className={`break-all font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {user.email}
              </p>

            </div>

          </div>

        </div>

        {/* ================= ACCOUNT INFORMATION ================= */}
        <div
          className={`mt-6 rounded-2xl p-6 shadow-sm ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-900"
          }`}
        >

          <h3
            className={`text-lg font-bold ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Account Information
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {/* User ID */}
            <div>

              <p
                className={
                  darkMode
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-500"
                }
              >
                User ID
              </p>

              <p
                className={`mt-1 break-all text-sm font-medium ${
                  darkMode
                    ? "text-slate-200"
                    : "text-slate-800"
                }`}
              >
                {user.id}
              </p>

            </div>

            {/* Email */}
            <div>

              <p
                className={
                  darkMode
                    ? "text-sm text-slate-400"
                    : "text-sm text-slate-500"
                }
              >
                Email
              </p>

              <p
                className={`mt-1 break-all text-sm font-medium ${
                  darkMode
                    ? "text-slate-200"
                    : "text-slate-800"
                }`}
              >
                {user.email}
              </p>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    setSession(null);
    setScreen("login");
  }

  /* Loading Screen */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-300">
          Checking session...
        </p>
      </div>
    );
  }

  /* Logged In */
  if (session) {
    return (
      <Home
        user={session.user}
        onLogout={handleLogout}
      />
    );
  }

  /* Register Screen */
  if (screen === "register") {
    return (
      <Register
        onSwitch={() => setScreen("login")}
        onRegistered={(user) =>
          setSession({ user })
        }
      />
    );
  }

  /* Login Screen */
  return (
    <Login
      onSwitchToRegister={() =>
        setScreen("register")
      }
      onLogin={(session) =>
        setSession(session)
      }
    />
  );
}