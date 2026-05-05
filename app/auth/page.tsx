// app/auth/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isLogin && !agreed) {
      toast.error("Please agree to the Terms & Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        // Sign Up
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;

        toast.success("Account created! Please check your email to confirm.");
        // Optionally auto sign in or redirect to login
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleWallet = () => {
    toast.success("Wallet connected successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center mb-6 text-4xl">
            💎
          </div>
          <CardTitle className="text-3xl">{isLogin ? "Sign In" : "Create Account"}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Wallet Login */}
          <Button onClick={handleWallet} variant="outline" className="w-full py-6">
            <Wallet className="mr-2 w-5 h-5" /> Connect Wallet (Recommended)
          </Button>

          <div className="relative text-center text-xs text-zinc-500">
            OR CONTINUE WITH EMAIL
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            )}

            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {!isLogin && (
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            )}

            {!isLogin && (
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-violet-500"
                />
                I agree to the{" "}
                <Link href="#" className="text-violet-400 hover:underline">
                  Terms & Privacy Policy
                </Link>
              </label>
            )}

            <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              <ArrowRight className="ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-violet-400 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}