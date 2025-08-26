import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { LoginForm } from './components/LoginForm'
import { DashboardComponent } from './components/DashboardComponent'
import { CourseDetail } from './components/CourseDetail'
import { UserProfileComponent } from './components/UserProfileComponent'
import { AdminPanelComponent } from './components/AdminPanelComponent'
import { Notifications } from './components/Notifications'
import { Toaster, toast } from 'sonner@2.0.3'
import { Bell, User, BookOpen, Settings, LogOut, Home, Wifi, WifiOff } from 'lucide-react'
import { useNotifications } from './hooks/useApiData'
import apiService from './services/api'

// Componente principal de la aplicación
function AppContent() {
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [isOnline, setIsOnline] = useState(true)
  
  // Hook para notificaciones solo si está autenticado
  const { 
    notifications, 
    unreadCount, 
    loading: notificationsLoading,
    markAsRead,
    markAllAsRead,
    refetch: refetchNotifications
  } = useNotifications(isAuthenticated ? {} : { skip: true })

  // Verificar conectividad con el backend
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const isHealthy = await apiService.healthCheck()
        setIsOnline(isHealthy)
        
        if (!isHealthy) {
          toast.error('Problema de conexión con el servidor')
        }
      } catch (error) {
        setIsOnline(false)
        toast.error('No se puede conectar con el servidor')
      }
    }

    checkBackendHealth()
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkBackendHealth, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Manejar cambios de red
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('Conexión restaurada')
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      toast.error('Sin conexión a internet')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setCurrentView('dashboard')
    setSelectedCourseId(null)
    toast.success('Sesión cerrada correctamente')
  }

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId)
    setCurrentView('course')
  }

  const handleNotificationRead = async (notificationId) => {
    try {
      await markAsRead(notificationId)
      toast.success('Notificación marcada como leída')
    } catch (error) {
      toast.error('Error al marcar notificación como leída')
    }
  }

  // Pantalla de carga inicial
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Cargando LMS...</p>
          {!isOnline && (
            <div className="flex items-center space-x-2 text-orange-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">Verificando conexión...</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoginForm />
        <Toaster position="top-right" />
        
        {/* Indicador de conectividad */}
        {!isOnline && (
          <div className="fixed bottom-4 left-4 bg-orange-100 border border-orange-300 rounded-lg p-3 flex items-center space-x-2">
            <WifiOff className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-800">Sin conexión al servidor</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl text-gray-900">LMS Banco de Bogotá</h1>
              </div>
              
              <nav className="hidden md:flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </button>
                
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      currentView === 'admin' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Administración
                  </button>
                )}
              </nav>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Indicador de conectividad */}
              <div className="flex items-center space-x-1 text-sm">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" title="Conectado" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" title="Sin conexión" />
                )}
              </div>
              
              <button
                onClick={() => setCurrentView('notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                disabled={notificationsLoading}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block">{user?.name}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <DashboardComponent 
            userData={user}
            onCourseSelect={handleCourseSelect}
          />
        )}
        
        {currentView === 'course' && selectedCourseId && (
          <CourseDetail 
            courseId={selectedCourseId}
            onBack={() => setCurrentView('dashboard')}
            userData={user}
          />
        )}
        
        {currentView === 'profile' && (
          <UserProfileComponent 
            userData={user}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        
        {currentView === 'admin' && user?.role === 'admin' && (
          <AdminPanelComponent onBack={() => setCurrentView('dashboard')} />
        )}
        
        {currentView === 'notifications' && (
          <Notifications 
            notifications={notifications}
            unreadCount={unreadCount}
            loading={notificationsLoading}
            onBack={() => setCurrentView('dashboard')}
            onNotificationRead={handleNotificationRead}
            onMarkAllAsRead={markAllAsRead}
            onRefresh={refetchNotifications}
          />
        )}
      </main>

      {/* Mensaje de conectividad para móviles */}
      {!isOnline && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-orange-100 border border-orange-300 rounded-lg p-3 flex items-center justify-center space-x-2">
          <WifiOff className="h-4 w-4 text-orange-600" />
          <span className="text-sm text-orange-800">Sin conexión al servidor</span>
        </div>
      )}
    </div>
  )
}

// Componente raíz con AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}