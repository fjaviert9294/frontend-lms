import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Clock, Users, BookOpen, CheckCircle2 } from 'lucide-react'

export default function CourseList({ courses, user, onCourseSelect }) {
  const getCourseProgress = (course) => {
    const courseProgress = user.currentProgress?.[course.id]
    if (!courseProgress) return 0
    
    const totalChapters = course.chapters?.length || 0
    const completedChapters = courseProgress.completedChapters?.length || 0
    
    return totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0
  }

  const isCourseCompleted = (course) => {
    return user.completedCourses?.includes(course.id) || false
  }

  const getCourseStatus = (course) => {
    if (isCourseCompleted(course)) return 'completed'
    if (user.currentProgress?.[course.id]) return 'in-progress'
    return 'not-started'
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>
      default:
        return <Badge variant="outline">No Iniciado</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cursos Disponibles</h2>
        <div className="text-sm text-gray-500">
          {courses.length} curso(s) disponible(s)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const progress = getCourseProgress(course)
          const status = getCourseStatus(course)
          const isCompleted = isCourseCompleted(course)

          return (
            <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 ml-2" />
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.chapters?.length || 0} capítulos
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration || 'Variable'}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progreso</span>
                    {getStatusBadge(status)}
                  </div>

                  {status !== 'not-started' && (
                    <div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(progress)}% completado
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {course.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <Button 
                      onClick={() => onCourseSelect(course)}
                      className="w-full"
                      variant={isCompleted ? "outline" : "default"}
                    >
                      {isCompleted ? 'Revisar Curso' : status === 'in-progress' ? 'Continuar' : 'Comenzar Curso'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay cursos disponibles
            </h3>
            <p className="text-gray-500">
              Los cursos aparecerán aquí cuando estén disponibles.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}