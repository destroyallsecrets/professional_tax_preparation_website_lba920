"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const createUserProfile = useMutation(api.users.createUserProfile);

  return (
    <div className="w-full">
      <form
        className="space-y-6 p-6 bg-black-light rounded-lg border border-gold-dark"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);

          const submission = async () => {
            await signIn("password", formData);
            if (flow === "signUp") {
              await createUserProfile({
                name: formData.get("name") as string,
              });
              toast.success("Account created successfully!");
            }
          };

          submission()
            .catch((error) => {
              let toastTitle = "";
              if (error.message.includes("Invalid password")) {
                toastTitle = "Invalid password. Please try again.";
              } else {
                toastTitle =
                  flow === "signIn"
                    ? "Could not sign in, did you mean to sign up?"
                    : "Could not sign up, did you mean to sign in?";
              }
              toast.error(toastTitle);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {flow === "signUp" && (
          <input
            className="auth-input-field"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        )}
        <div>
          <label className="block text-gold-light mb-2">Email</label>
          <input
            type="email"
            className="auth-input-field"
            placeholder="Enter your email"
            name="email"
            required
          />
        </div>
        <div>
          <label className="block text-gold-light mb-2">Password</label>
          <input
            type="password"
            className="auth-input-field"
            placeholder="Enter your password"
            name="password"
            required
          />
        </div>
        <button className="auth-button" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-3">
        <hr className="my-4 grow border-gold/20" />
        <span className="mx-4 text-secondary">or</span>
        <hr className="my-4 grow border-gold/20" />
      </div>
      <button className="auth-button" onClick={() => void signIn("anonymous")}>
        Sign in anonymously
      </button>
    </div>
  );
}
