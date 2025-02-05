import type React from "react"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full animate-spin border-t-blue-600`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner

