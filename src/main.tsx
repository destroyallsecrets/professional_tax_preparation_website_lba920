import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

// Debug environment variables
console.log("VITE_CONVEX_URL:", import.meta.env.VITE_CONVEX_URL);
console.log("All env vars:", import.meta.env);

const convexUrl = import.meta.env.VITE_CONVEX_URL as string || "https://nautical-swan-688.convex.cloud";

console.log("Using Convex URL:", convexUrl);

const convex = new ConvexReactClient(convexUrl);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>,
  );
} catch (error) {
  console.error("Error rendering app:", error);
  // Fallback rendering
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Loading Error</h1>
      <p>There was an error loading the application. Please refresh the page.</p>
      <p>Error: ${error}</p>
    </div>
  `;
}
