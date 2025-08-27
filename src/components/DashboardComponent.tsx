import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Play, 
  CheckCircle, 
  Star,
  Users,
  Target,
  Calendar,
  ChevronRight
} from 'lucide-react'

interface DashboardProps {
  userData: any
  onCourseSelect: (courseId: string) => void
}

// Datos mockeados para cursos
const mockCourses = [
  {
    id: '1',
    title: 'Fundamentos de Liderazgo Digital',
    description: 'Aprende los principios básicos del liderazgo en la era digital',
    instructor: 'Dr. Ana Martínez',
    duration: '4 horas',
    chaptersTotal: 8,
    chaptersCompleted: 3,
    progress: 37,
    difficulty: 'Intermedio',
    category: 'Liderazgo',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    isEnrolled: true,
    rating: 4.8,
    studentsCount: 1250
  },
  {
    id: '2',
    title: 'Comunicación Efectiva en Equipos',
    description: 'Mejora tus habilidades de comunicación para trabajar en equipo',
    instructor: 'Lic. Carlos Rodríguez',
    duration: '3.5 horas',
    chaptersTotal: 6,
    chaptersCompleted: 6,
    progress: 100,
    difficulty: 'Básico',
    category: 'Comunicación',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop',
    isEnrolled: true,
    isCompleted: true,
    rating: 4.6,
    studentsCount: 890
  },
  {
    id: '3',
    title: 'Gestión del Tiempo y Productividad',
    description: 'Técnicas avanzadas para optimizar tu tiempo y aumentar la productividad',
    instructor: 'Mg. Laura Jiménez',
    duration: '5 horas',
    chaptersTotal: 10,
    chaptersCompleted: 7,
    progress: 70,
    difficulty: 'Intermedio',
    category: 'Productividad',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
    isEnrolled: true,
    rating: 4.9,
    studentsCount: 2100
  },
  {
    id: '4',
    title: 'Seguridad Cibernética Empresarial',
    description: 'Protege tu empresa de las amenazas digitales más comunes',
    instructor: 'Ing. Roberto Silva',
    duration: '6 horas',
    chaptersTotal: 12,
    chaptersCompleted: 0,
    progress: 0,
    difficulty: 'Avanzado',
    category: 'Seguridad',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop',
    isEnrolled: false,
    rating: 4.7,
    studentsCount: 650
  },
  {
    id: '5',
    title: 'Innovación y Creatividad',
    description: 'Desarrolla tu pensamiento creativo e innovador',
    instructor: 'Dra. Patricia Vega',
    duration: '4.5 horas',
    chaptersTotal: 9,
    chaptersCompleted: 0,
    progress: 0,
    difficulty: 'Intermedio',
    category: 'Innovación',
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=200&fit=crop',
    isEnrolled: false,
    rating: 4.5,
    studentsCount: 320
  }
]

const recentActivity = [
  {
    id: '1',
    type: 'course_completed',
    title: 'Completaste "Comunicación Efectiva en Equipos"',
    date: '2024-08-20',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '2',
    type: 'badge_earned',
    title: 'Ganaste la insignia "Comunicador"',
    date: '2024-08-20',
    icon: Award,
    color: 'text-yellow-600'
  },
  {
    id: '3',
    type: 'chapter_completed',
    title: 'Completaste el Capítulo 7 de "Gestión del Tiempo"',
    date: '2024-08-19',
    icon: BookOpen,
    color: 'text-blue-600'
  }
]

export function DashboardComponent({ userData, onCourseSelect }: DashboardProps) {
  const enrolledCourses = mockCourses.filter(course => course.isEnrolled)
  const availableCourses = mockCourses.filter(course => !course.isEnrolled)
  const completedCourses = mockCourses.filter(course => course.isCompleted)
  const inProgressCourses = enrolledCourses.filter(course => course.progress > 0 && course.progress < 100)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl mb-2">¡Hola, {userData?.name}! 👋</h1>
            <p className="text-blue-100">Continúa tu camino de aprendizaje. Tienes {inProgressCourses.length} cursos en progreso.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl">{userData?.currentStreak || 15}</div>
              <div className="text-sm text-blue-100">Días seguidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{userData?.totalBadges || 8}</div>
              <div className="text-sm text-blue-100">Insignias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cursos Completados</p>
              <p className="text-2xl text-gray-900">{completedCourses.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Progreso</p>
              <p className="text-2xl text-gray-900">{inProgressCourses.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Insignias Ganadas</p>
              <p className="text-2xl text-gray-900">{userData?.totalBadges || 8}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tiempo Total</p>
              <p className="text-2xl text-gray-900">45h</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          {inProgressCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Continúa Aprendiendo</h2>
                <Button variant="ghost" size="sm">
                  Ver todos <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid gap-6">
                {inProgressCourses.slice(0, 2).map((course) => (
                  <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onCourseSelect(course.id)}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full md:w-32 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg text-gray-900 mb-1">{course.title}</h3>
                          <Badge variant="secondary">{course.difficulty}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Continuar
                          </Button>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Progreso</span>
                            <span className="text-gray-900">{course.chaptersCompleted}/{course.chaptersTotal} capítulos</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Available Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-900">Cursos Disponibles</h2>
              <Button variant="ghost" size="sm">
                Ver catálogo completo <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCourses.slice(0, 4).map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onCourseSelect(course.id)}>
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="mb-2">{course.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.studentsCount} estudiantes
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                    <Button className="w-full">
                      Inscribirse
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Learning Goals */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Metas de Aprendizaje</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Meta mensual</span>
                </div>
                <span className="text-sm text-gray-500">2/3 cursos</span>
              </div>
              <Progress value={67} className="h-2" />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Racha diaria</span>
                </div>
                <span className="text-sm text-gray-500">{userData?.currentStreak || 15} días</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Explorar catálogo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Ver mis insignias
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progreso detallado
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}