import React, { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { DashboardComponent } from './components/DashboardComponent'
import { CourseDetail } from './components/CourseDetail'
import { UserProfileComponent } from './components/UserProfileComponent'
import { AdminPanelComponent } from './components/AdminPanelComponent'
import { Notifications } from './components/Notifications'
import { Toaster, toast } from 'sonner@2.0.3'
import { Bell, User, BookOpen, Settings, LogOut, Home } from 'lucide-react'

// Datos mockeados
const mockUsers = {
  student: {
    id: '1',
    email: 'estudiante@empresa.com',
    name: 'María González',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c8de?w=100&h=100&fit=crop&crop=face',
    completedCourses: 12,
    totalBadges: 8,
    currentStreak: 15,
    badges: [
      { id: '1', name: 'Novato', description: 'Completa tu primer curso', icon: '🎯', earned: true, earnedDate: '2024-01-15' },
      { id: '2', name: 'Experto en Seguridad', description: 'Completa 5 cursos de seguridad', icon: '🛡️', earned: true, earnedDate: '2024-02-20' },
      { id: '3', name: 'Comunicador', description: 'Completa cursos de comunicación', icon: '💬', earned: true, earnedDate: '2024-03-10' }
    ]
  },
  admin: {
    id: '2',
    email: 'admin@empresa.com',
    name: 'Carlos Ramírez',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
}

const mockNotifications = [
  {
    id: '1',
    title: 'Nuevo curso disponible: Liderazgo Digital',
    message: 'Un nuevo curso sobre liderazgo en la era digital está disponible.',
    read: false,
    createdAt: '2024-08-20T10:00:00Z',
    type: 'new_course'
  },
  {
    id: '2',
    title: '¡Felicidades! Has ganado una nueva insignia',
    message: 'Has completado el curso de Comunicación Efectiva y ganado la insignia "Comunicador".',
    read: false,
    createdAt: '2024-08-19T15:30:00Z',
    type: 'badge_earned'
  },
  {
    id: '3',
    title: 'Recordatorio: Completa tu curso',
    message: 'Te queda 1 capítulo para completar "Gestión del Tiempo".',
    read: true,
    createdAt: '2024-08-18T09:00:00Z',
    type: 'reminder'
  }
]

export default function App() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const handleLogin = async (email, password, isSignup = false, name = '', role = 'student') => {
    // Simular proceso de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const selectedUser = role === 'admin' ? mockUsers.admin : mockUsers.student
    if (isSignup && name) {
      selectedUser.name = name
    }
    
    setUser({ id: selectedUser.id, email })
    setUserData(selectedUser)
    toast.success(isSignup ? '¡Registro exitoso! Bienvenido' : '¡Bienvenido de vuelta!')
    return true
  }

  const handleLogout = () => {
    setUser(null)
    setUserData(null)
    setCurrentView('dashboard')
    setSelectedCourseId(null)
    toast.success('Sesión cerrada correctamente')
  }

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId)
    setCurrentView('course')
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Cargando LMS...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
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
                
                {userData?.role === 'admin' && (
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
              <button
                onClick={() => setCurrentView('notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:block">{userData?.name}</span>
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
            userData={userData}
            onCourseSelect={handleCourseSelect}
          />
        )}
        
        {currentView === 'course' && selectedCourseId && (
          <CourseDetail 
            courseId={selectedCourseId}
            onBack={() => setCurrentView('dashboard')}
            userData={userData}
          />
        )}
        
        {currentView === 'profile' && (
          <UserProfileComponent 
            userData={userData}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
        
        {currentView === 'admin' && userData?.role === 'admin' && (
          <AdminPanelComponent onBack={() => setCurrentView('dashboard')} />
        )}
        
        {currentView === 'notifications' && (
          <Notifications 
            notifications={notifications}
            onBack={() => setCurrentView('dashboard')}
            onNotificationRead={markNotificationAsRead}
          />
        )}
      </main>
    </div>
  )
}