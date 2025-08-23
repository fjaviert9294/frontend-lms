import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  ChevronLeft,
  Bell,
  Award,
  BookOpen,
  Calendar,
  Settings,
  Trash2,
  MarkAsRead,
  BellOff,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  Gift
} from 'lucide-react'

interface NotificationsProps {
  notifications: any[]
  onBack: () => void
  onNotificationRead: (notificationId: string) => void
}

// Datos mockeados expandidos para notificaciones
const mockNotifications = [
  {
    id: '1',
    title: 'Nuevo curso disponible: Liderazgo Digital',
    message: 'Un nuevo curso sobre liderazgo en la era digital está disponible. ¡Inscríbete ahora y mejora tus habilidades de liderazgo!',
    read: false,
    createdAt: '2024-08-23T10:00:00Z',
    type: 'new_course',
    priority: 'high',
    actionUrl: '/courses/6'
  },
  {
    id: '2',
    title: '¡Felicidades! Has ganado una nueva insignia',
    message: 'Has completado el curso de Comunicación Efectiva y ganado la insignia "Comunicador". ¡Sigue así!',
    read: false,
    createdAt: '2024-08-22T15:30:00Z',
    type: 'badge_earned',
    priority: 'medium',
    badgeName: 'Comunicador',
    badgeIcon: '💬'
  },
  {
    id: '3',
    title: 'Recordatorio: Completa tu curso',
    message: 'Te queda 1 capítulo para completar "Gestión del Tiempo". ¡Estás muy cerca de terminarlo!',
    read: true,
    createdAt: '2024-08-21T09:00:00Z',
    type: 'reminder',
    priority: 'low',
    courseProgress: 90
  },
  {
    id: '4',
    title: 'Nuevo material disponible',
    message: 'Se ha agregado nuevo contenido al curso "Fundamentos de Liderazgo Digital". Revisa las actualizaciones.',
    read: false,
    createdAt: '2024-08-20T14:20:00Z',
    type: 'content_update',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Meta mensual alcanzada',
    message: '¡Excelente trabajo! Has completado tu meta de 3 cursos este mes. Mantén el buen ritmo.',
    read: true,
    createdAt: '2024-08-19T16:45:00Z',
    type: 'achievement',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Invitación a sesión en vivo',
    message: 'El Dr. Ana Martínez realizará una sesión en vivo sobre "Tendencias en Liderazgo" mañana a las 3:00 PM.',
    read: false,
    createdAt: '2024-08-18T11:30:00Z',
    type: 'event',
    priority: 'high',
    eventDate: '2024-08-24T15:00:00Z'
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'new_course': return <BookOpen className="h-5 w-5 text-blue-600" />
    case 'badge_earned': return <Award className="h-5 w-5 text-yellow-600" />
    case 'reminder': return <AlertCircle className="h-5 w-5 text-orange-600" />
    case 'content_update': return <Info className="h-5 w-5 text-purple-600" />
    case 'achievement': return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'event': return <Calendar className="h-5 w-5 text-red-600" />
    default: return <Bell className="h-5 w-5 text-gray-600" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-red-500 bg-red-50'
    case 'medium': return 'border-l-yellow-500 bg-yellow-50'
    case 'low': return 'border-l-blue-500 bg-blue-50'
    default: return 'border-l-gray-500 bg-gray-50'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Hace unos minutos'
  if (diffInHours < 24) return `Hace ${diffInHours} horas`
  if (diffInHours < 48) return 'Ayer'
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export function Notifications({ notifications, onBack, onNotificationRead }: NotificationsProps) {
  const [selectedTab, setSelectedTab] = useState('all')
  const [notificationList, setNotificationList] = useState(mockNotifications)

  const filteredNotifications = notificationList.filter(notification => {
    switch (selectedTab) {
      case 'unread': return !notification.read
      case 'courses': return ['new_course', 'content_update', 'reminder'].includes(notification.type)
      case 'achievements': return ['badge_earned', 'achievement'].includes(notification.type)
      case 'events': return notification.type === 'event'
      default: return true
    }
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const handleMarkAsRead = (notificationId: string) => {
    setNotificationList(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
    onNotificationRead(notificationId)
  }

  const handleMarkAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== notificationId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl text-gray-900">Notificaciones</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} notificaciones sin leer` : 'Todas las notificaciones están al día'}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como leídas
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bell className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg text-gray-900">{notificationList.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sin leer</p>
              <p className="text-lg text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Award className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Logros</p>
              <p className="text-lg text-gray-900">
                {notificationList.filter(n => ['badge_earned', 'achievement'].includes(n.type)).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Eventos</p>
              <p className="text-lg text-gray-900">
                {notificationList.filter(n => n.type === 'event').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">Sin leer ({unreadCount})</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">No hay notificaciones</h3>
                <p className="text-gray-600">
                  {selectedTab === 'unread' 
                    ? '¡Genial! Estás al día con todas tus notificaciones.'
                    : 'No tienes notificaciones en esta categoría.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 p-4 rounded-lg transition-all duration-200 ${
                      !notification.read ? getPriorityColor(notification.priority) : 'border-l-gray-300 bg-white'
                    } ${!notification.read ? 'shadow-sm' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${!notification.read ? 'bg-white' : 'bg-gray-100'}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-gray-900 ${!notification.read ? 'font-medium' : ''}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatDate(notification.createdAt)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{notification.message}</p>
                          
                          {/* Special content based on notification type */}
                          {notification.type === 'badge_earned' && notification.badgeIcon && (
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="text-2xl">{notification.badgeIcon}</div>
                              <Badge className="bg-yellow-100 text-yellow-700">
                                Insignia: {notification.badgeName}
                              </Badge>
                            </div>
                          )}
                          
                          {notification.type === 'reminder' && notification.courseProgress && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Progreso del curso</span>
                                <span className="text-gray-900">{notification.courseProgress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${notification.courseProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          {notification.type === 'event' && notification.eventDate && (
                            <div className="mb-3">
                              <Badge variant="outline" className="text-red-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(notification.eventDate).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </Badge>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Marcar como leída
                              </Button>
                            )}
                            
                            {notification.actionUrl && (
                              <Button size="sm">
                                Ver más
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-600 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Notification Settings Quick Access */}
      <Card className="p-6">
        <h3 className="text-lg text-gray-900 mb-4">Configuración de Notificaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700">Nuevos cursos</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-gray-700">Insignias y logros</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-700">Recordatorios</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-red-600" />
              <span className="text-sm text-gray-700">Eventos y sesiones</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar todas las notificaciones
          </Button>
        </div>
      </Card>
    </div>
  )
}