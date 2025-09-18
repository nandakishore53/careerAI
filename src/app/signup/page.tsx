import AnimatedBackground from "@/components/AnimatedBackground";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-white">
          
        </h1>

        <SignupForm />

        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </main>
  );
}
