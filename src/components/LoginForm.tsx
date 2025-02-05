"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    if (isLogin) {
      // Lógica de login
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Erro ao fazer login")
        }

        // Login bem-sucedido
        login(data.user)
        setSuccessMessage("Login realizado com sucesso!")
        router.push("/dashboard")
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao fazer login")
      }
    } else {
      // Lógica de registro
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Erro ao criar usuário")
        }

        // Usuário criado com sucesso
        setSuccessMessage("Usuário criado com sucesso! Faça login para continuar.")
        setIsLogin(true)
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro ao criar usuário")
      }
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Card className="w-full max-w-md bg-background shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-foreground">{isLogin ? "Login" : "Cadastro"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nome completo
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="rounded-md"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="rounded-md"
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmar senha
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="rounded-md"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full rounded-md" disabled={isLoading}>
            {isLoading ? <LoadingSpinner size="small" /> : isLogin ? "Entrar" : "Cadastrar"}
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setSuccessMessage("")
            }}
            className="w-full text-primary hover:text-primary/90"
            disabled={isLoading}
          >
            {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

