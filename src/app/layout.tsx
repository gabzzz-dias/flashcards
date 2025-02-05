import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedFlashcards",
  description: "Plataforma de estudos com flashcards para estudantes de medicina",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <AuthProvider>
          <main className="flex min-h-screen flex-col items-center justify-center p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

