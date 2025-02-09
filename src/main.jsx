import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"

import App from "./components/App/App"
import ErrorFallback from "./components/ErrorFallback/ErrorFallback"

import "./index.css"
import "./queries.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
