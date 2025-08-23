import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bell, BookOpen, CheckCircle2, Clock } from 'lucide-react'
import { projectId } from '../utils/supabase/info'

export default function NotificationCenter({ notifications, session, onNotificationRead }) {
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8def1640/notifications/${notificationId}/read`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        onNotificationRead()
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    } else {
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_course':
        return <BookOpen className="h-5 w-5 text-blue-600" />
      case 'course_completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const unreadNotifications = notifications.filter(n => !n.read)
  const readNotifications = notifications.filter(n => n.read)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Centro de Notificaciones</span>
          </CardTitle>
          <CardDescription>
            Mantente al día con nuevos cursos y actualizaciones
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Notificaciones No Leídas */}
      {unreadNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Nuevas Notificaciones ({unreadNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">
                            {notification.message}
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            {notification.courseName && (
                              <>Curso: {notification.courseName}</>
                            )}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(notification.createdAt)}
                          </Badge>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Marcar leída
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notificaciones Leídas */}
      {readNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Notificaciones Anteriores ({readNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {readNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 opacity-60">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-700">
                            {notification.message}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.courseName && (
                              <>Curso: {notification.courseName}</>
                            )}
                          </p>
                        </div>
                        
                        <Badge variant="outline" className="text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(notification.createdAt)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estado Vacío */}
      {notifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay notificaciones
            </h3>
            <p className="text-gray-500">
              Las notificaciones aparecerán aquí cuando haya nuevos cursos o actualizaciones.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}