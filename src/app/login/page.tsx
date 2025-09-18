import AnimatedBackground from "@/components/AnimatedBackground";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-white">
        
        </h1>

        <LoginForm />

        <p className="text-center mt-6 text-sm text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
