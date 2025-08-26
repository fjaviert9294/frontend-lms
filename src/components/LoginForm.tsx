import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BookOpen, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { useAuth } from '../hooks/useAuth'

export function LoginForm() {
  const { login, register, loading } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    department: '',
    position: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (isSignup) {
      if (!formData.name) {
        newErrors.name = 'El nombre es requerido'
      }
      if (!formData.department) {
        newErrors.department = 'El departamento es requerido'
      }
      if (!formData.position) {
        newErrors.position = 'El cargo es requerido'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormLoading(true)

    try {
      let result

      if (isSignup) {
        // Registro
        result = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
          department: formData.department,
          position: formData.position
        })
      } else {
        // Login
        result = await login(formData.email, formData.password)
      }

      if (result.success) {
        toast.success(
          isSignup 
            ? `¡Bienvenido ${result.user.name}! Tu cuenta ha sido creada exitosamente.`
            : `¡Bienvenido de vuelta ${result.user.name}!`
        )
      } else {
        toast.error(result.error || 'Error en la autenticación')
      }
    } catch (error) {
      console.error('Error en autenticación:', error)
      toast.error('Error de conexión. Por favor intenta nuevamente.')
    } finally {
      setFormLoading(false)
    }
  }

  const fillTestCredentials = (role) => {
    const testUsers = {
      student: {
        email: 'estudiante@bancodebogota.com.co',
        password: '123456'
      },
      admin: {
        email: 'admin@bancodebogota.com.co',
        password: '123456'
      },
      instructor: {
        email: 'ana.martinez@bancodebogota.com.co',
        password: '123456'
      }
    }

    setFormData(prev => ({
      ...prev,
      email: testUsers[role].email,
      password: testUsers[role].password
    }))
    setErrors({})
    toast.info(`Credenciales de ${role} cargadas`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">
            {isSignup ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </CardTitle>
          <CardDescription>
            {isSignup 
              ? 'Crea tu cuenta en el LMS Corporativo'
              : 'Accede a tu cuenta del LMS Corporativo'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={formLoading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      name="department"
                      type="text"
                      placeholder="Ej: Ventas"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={errors.department ? 'border-red-500' : ''}
                      disabled={formLoading}
                    />
                    {errors.department && (
                      <p className="text-sm text-red-500">{errors.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      placeholder="Ej: Ejecutivo"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={errors.position ? 'border-red-500' : ''}
                      disabled={formLoading}
                    />
                    {errors.position && (
                      <p className="text-sm text-red-500">{errors.position}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={formLoading}
                  >
                    <option value="student">Estudiante</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@empresa.com"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'border-red-500' : ''}
                disabled={formLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  disabled={formLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={formLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={formLoading || loading}
            >
              {formLoading || loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignup ? 'Creando cuenta...' : 'Iniciando sesión...'}
                </>
              ) : (
                isSignup ? 'Crear Cuenta' : 'Iniciar Sesión'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup)
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    role: 'student',
                    department: '',
                    position: ''
                  })
                  setErrors({})
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                disabled={formLoading || loading}
              >
                {isSignup 
                  ? '¿Ya tienes cuenta? Inicia sesión' 
                  : '¿No tienes cuenta? Regístrate'
                }
              </button>
            </div>
          </form>

          {/* Credenciales de prueba - solo para desarrollo */}
          {!isSignup && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center mb-3">
                Credenciales de prueba:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestCredentials('student')}
                  disabled={formLoading || loading}
                >
                  Estudiante
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestCredentials('admin')}
                  disabled={formLoading || loading}
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestCredentials('instructor')}
                  disabled={formLoading || loading}
                >
                  Instructor
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}