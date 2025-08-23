import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ArrowLeft, Play, CheckCircle2, Lock, FileText, Video, Download } from 'lucide-react'
import { projectId } from '../utils/supabase/info'

export default function CourseDetails({ course, user, session, onBack }) {
  const [completingChapter, setCompletingChapter] = useState(null)

  const courseProgress = user.currentProgress?.[course.id]
  const completedChapters = courseProgress?.completedChapters || []
  const totalChapters = course.chapters?.length || 0
  const progressPercentage = totalChapters > 0 ? (completedChapters.length / totalChapters) * 100 : 0
  const isCourseCompleted = user.completedCourses?.includes(course.id) || false

  const isChapterCompleted = (chapterId) => {
    return completedChapters.includes(chapterId)
  }

  const isChapterAccessible = (chapterIndex) => {
    // El primer capítulo siempre es accesible
    if (chapterIndex === 0) return true
    
    // Los capítulos siguientes son accesibles si el anterior está completado
    const previousChapter = course.chapters[chapterIndex - 1]
    return isChapterCompleted(previousChapter.id)
  }

  const markChapterComplete = async (chapterId) => {
    if (isChapterCompleted(chapterId)) return

    setCompletingChapter(chapterId)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8def1640/courses/${course.id}/chapters/${chapterId}/complete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const result = await response.json()
        
        // Actualizar el usuario local
        if (!user.currentProgress[course.id]) {
          user.currentProgress[course.id] = { completedChapters: [] }
        }
        
        if (!user.currentProgress[course.id].completedChapters.includes(chapterId)) {
          user.currentProgress[course.id].completedChapters.push(chapterId)
        }

        if (result.courseCompleted) {
          if (!user.completedCourses.includes(course.id)) {
            user.completedCourses.push(course.id)
          }
          
          // Agregar la insignia si no existe
          const badgeExists = user.badges.some(badge => badge.courseId === course.id)
          if (!badgeExists && course.badge) {
            user.badges.push({
              ...course.badge,
              courseId: course.id,
              earnedAt: new Date().toISOString()
            })
          }
        }

        // Forzar re-render
        window.location.reload()
      }
    } catch (error) {
      console.error('Error marking chapter as complete:', error)
    } finally {
      setCompletingChapter(null)
    }
  }

  const getContentIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      case 'download':
        return <Download className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Cursos
        </Button>
      </div>

      {/* Course Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{course.title}</CardTitle>
              <CardDescription className="mt-2 text-base">
                {course.description}
              </CardDescription>
            </div>
            {isCourseCompleted && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completado
              </Badge>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso del Curso</span>
              <span className="text-sm text-gray-500">
                {completedChapters.length} de {totalChapters} capítulos
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progressPercentage)}% completado
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Course Chapters */}
      <Card>
        <CardHeader>
          <CardTitle>Contenido del Curso</CardTitle>
          <CardDescription>
            Completa cada capítulo en orden para avanzar en el curso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.chapters?.map((chapter, index) => {
              const isCompleted = isChapterCompleted(chapter.id)
              const isAccessible = isChapterAccessible(index)
              const isCurrentlyCompleting = completingChapter === chapter.id

              return (
                <div
                  key={chapter.id}
                  className={`border rounded-lg p-4 ${
                    isCompleted
                      ? 'bg-green-50 border-green-200'
                      : isAccessible
                      ? 'bg-white border-gray-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 ${!isAccessible ? 'opacity-50' : ''}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : isAccessible ? (
                          <Play className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Lock className="h-6 w-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className={`font-medium ${!isAccessible ? 'text-gray-400' : ''}`}>
                          Capítulo {index + 1}: {chapter.title}
                        </h4>
                        {chapter.description && (
                          <p className={`text-sm mt-1 ${!isAccessible ? 'text-gray-400' : 'text-gray-600'}`}>
                            {chapter.description}
                          </p>
                        )}

                        {chapter.content && (
                          <div className="flex items-center space-x-2 mt-2">
                            {getContentIcon(chapter.contentType)}
                            <span className="text-xs text-gray-500">
                              {chapter.contentType === 'video' ? 'Video' : 
                               chapter.contentType === 'document' ? 'Documento' : 'Contenido'}
                            </span>
                            {chapter.duration && (
                              <span className="text-xs text-gray-500">
                                • {chapter.duration}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800">
                          Completado
                        </Badge>
                      )}

                      {!isCompleted && isAccessible && (
                        <Button
                          size="sm"
                          onClick={() => markChapterComplete(chapter.id)}
                          disabled={isCurrentlyCompleting}
                        >
                          {isCurrentlyCompleting ? 'Marcando...' : 'Marcar Completado'}
                        </Button>
                      )}

                      {!isAccessible && (
                        <Badge variant="outline" className="text-gray-400">
                          Bloqueado
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content Preview */}
                  {chapter.content && isAccessible && (
                    <div className="mt-4 border-t pt-4">
                      {chapter.contentType === 'video' && (
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-gray-500">Vista previa del video</span>
                        </div>
                      )}

                      {chapter.contentType === 'document' && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Documento del capítulo</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Contenido del documento disponible para lectura.
                          </p>
                        </div>
                      )}

                      {chapter.content.url && (
                        <div className="mt-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={chapter.content.url} target="_blank" rel="noopener noreferrer">
                              Ver Contenido
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {isCourseCompleted && course.badge && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{course.badge.icon}</div>
                <div>
                  <h4 className="font-medium text-yellow-800">¡Insignia Obtenida!</h4>
                  <p className="text-sm text-yellow-700">{course.badge.description}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}