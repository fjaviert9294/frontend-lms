import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  ChevronLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Download,
  Share2,
  Award,
  FileText,
  Video,
  Calendar,
  User
} from 'lucide-react'

interface CourseDetailProps {
  courseId: string
  onBack: () => void
  userData: any
}

// Datos mockeados para el curso
const mockCourseData = {
  '1': {
    id: '1',
    title: 'Fundamentos de Liderazgo Digital',
    description: 'Aprende los principios básicos del liderazgo en la era digital. Este curso te proporcionará las herramientas necesarias para liderar equipos efectivamente en entornos digitales.',
    instructor: {
      name: 'Dr. Ana Martínez',
      title: 'PhD en Administración de Empresas',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c8de?w=100&h=100&fit=crop&crop=face',
      bio: 'Experta en liderazgo digital con más de 15 años de experiencia en consultoría empresarial.'
    },
    duration: '4 horas',
    difficulty: 'Intermedio',
    category: 'Liderazgo',
    rating: 4.8,
    studentsCount: 1250,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
    isEnrolled: true,
    progress: 37,
    chaptersTotal: 8,
    chaptersCompleted: 3,
    chapters: [
      {
        id: '1',
        title: 'Introducción al Liderazgo Digital',
        duration: '25 min',
        type: 'video',
        completed: true,
        description: 'Conceptos básicos y evolución del liderazgo'
      },
      {
        id: '2',
        title: 'Características del Líder Digital',
        duration: '30 min',
        type: 'video',
        completed: true,
        description: 'Competencias clave para el liderazgo moderno'
      },
      {
        id: '3',
        title: 'Herramientas de Comunicación Digital',
        duration: '35 min',
        type: 'video',
        completed: true,
        description: 'Plataformas y técnicas de comunicación efectiva'
      },
      {
        id: '4',
        title: 'Gestión de Equipos Remotos',
        duration: '40 min',
        type: 'video',
        completed: false,
        description: 'Estrategias para liderar equipos distribuidos'
      },
      {
        id: '5',
        title: 'Toma de Decisiones en Entornos Digitales',
        duration: '30 min',
        type: 'document',
        completed: false,
        description: 'Metodologías para decisiones efectivas'
      },
      {
        id: '6',
        title: 'Evaluación: Caso Práctico',
        duration: '45 min',
        type: 'quiz',
        completed: false,
        description: 'Aplicación práctica de conceptos aprendidos'
      },
      {
        id: '7',
        title: 'Tendencias en Liderazgo Digital',
        duration: '25 min',
        type: 'video',
        completed: false,
        description: 'Futuro del liderazgo en la era digital'
      },
      {
        id: '8',
        title: 'Plan de Desarrollo Personal',
        duration: '30 min',
        type: 'document',
        completed: false,
        description: 'Creación de tu hoja de ruta de liderazgo'
      }
    ],
    learningObjectives: [
      'Comprender los fundamentos del liderazgo digital',
      'Desarrollar habilidades de comunicación efectiva',
      'Aprender a gestionar equipos remotos',
      'Dominar herramientas digitales de liderazgo',
      'Crear estrategias de desarrollo de equipos'
    ],
    prerequisites: [
      'Experiencia básica en gestión de equipos',
      'Conocimientos básicos de herramientas digitales'
    ],
    materials: [
      { name: 'Manual del Líder Digital.pdf', type: 'pdf', size: '2.3 MB' },
      { name: 'Plantillas de Comunicación.zip', type: 'zip', size: '1.8 MB' },
      { name: 'Herramientas Recomendadas.docx', type: 'doc', size: '856 KB' }
    ]
  }
}

const getChapterIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video className="h-5 w-5" />
    case 'document': return <FileText className="h-5 w-5" />
    case 'quiz': return <Award className="h-5 w-5" />
    default: return <BookOpen className="h-5 w-5" />
  }
}

export function CourseDetail({ courseId, onBack, userData }: CourseDetailProps) {
  const [currentChapter, setCurrentChapter] = useState(1)
  const course = mockCourseData[courseId as keyof typeof mockCourseData]

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Curso no encontrado</p>
        <Button onClick={onBack} className="mt-4">Volver al dashboard</Button>
      </div>
    )
  }

  const handleChapterComplete = (chapterId: string) => {
    // Lógica para marcar capítulo como completado
    console.log('Completando capítulo:', chapterId)
  }

  const handleEnroll = () => {
    // Lógica para inscribirse al curso
    console.log('Inscribiéndose al curso:', courseId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {course.instructor.name}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </span>
              <Badge variant="secondary">{course.difficulty}</Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Recursos
          </Button>
        </div>
      </div>

      {/* Course Banner */}
      <Card className="overflow-hidden">
        <div className="relative">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {course.isEnrolled ? (
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Play className="h-5 w-5 mr-2" />
                {course.progress > 0 ? 'Continuar Curso' : 'Comenzar Curso'}
              </Button>
            ) : (
              <Button size="lg" onClick={handleEnroll}>
                Inscribirse al Curso
              </Button>
            )}
          </div>
        </div>
        
        {course.isEnrolled && (
          <div className="p-4 bg-blue-50 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progreso del curso</span>
              <span className="text-sm text-gray-900">
                {course.chaptersCompleted}/{course.chaptersTotal} capítulos completados
              </span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="content">Contenido</TabsTrigger>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="materials">Materiales</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Contenido del Curso</h3>
                <div className="space-y-3">
                  {course.chapters.map((chapter, index) => (
                    <div 
                      key={chapter.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        chapter.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          chapter.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {chapter.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            getChapterIcon(chapter.type)
                          )}
                        </div>
                        <div>
                          <h4 className={`${chapter.completed ? 'text-gray-900' : 'text-gray-700'}`}>
                            {index + 1}. {chapter.title}
                          </h4>
                          <p className="text-sm text-gray-600">{chapter.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{chapter.duration}</span>
                        {course.isEnrolled && (
                          <Button 
                            size="sm" 
                            variant={chapter.completed ? "outline" : "default"}
                            onClick={() => handleChapterComplete(chapter.id)}
                          >
                            {chapter.completed ? 'Repasar' : 'Iniciar'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Descripción</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  
                  <h3 className="text-lg text-gray-900 mb-4">Objetivos de Aprendizaje</h3>
                  <ul className="space-y-2 mb-6">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg text-gray-900 mb-4">Prerrequisitos</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="materials">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Materiales del Curso</h3>
                <div className="space-y-3">
                  {course.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">{material.name}</h4>
                          <p className="text-sm text-gray-500">{material.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg text-gray-900">Reseñas del Curso</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-gray-900">{course.rating}</span>
                    <span className="text-gray-500">({course.studentsCount} reseñas)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Mock reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-gray-900">María González</h4>
                          <div className="flex space-x-1">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Excelente curso, muy práctico y con ejemplos reales. Me ayudó mucho a mejorar mi liderazgo digital.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Hace 3 días</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        C
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-gray-900">Carlos Ruiz</h4>
                          <div className="flex space-x-1">
                            {[1,2,3,4].map(star => (
                              <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Buen contenido, aunque algunos temas podrían profundizarse más. Recomendado para principiantes.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Hace 1 semana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Card */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Instructor</h3>
            <div className="flex items-start space-x-3">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-gray-900">{course.instructor.name}</h4>
                <p className="text-sm text-gray-600">{course.instructor.title}</p>
                <p className="text-sm text-gray-500 mt-2">{course.instructor.bio}</p>
              </div>
            </div>
          </Card>

          {/* Course Stats */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Estudiantes</span>
                </div>
                <span className="text-gray-900">{course.studentsCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Duración</span>
                </div>
                <span className="text-gray-900">{course.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Capítulos</span>
                </div>
                <span className="text-gray-900">{course.chaptersTotal}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Calificación</span>
                </div>
                <span className="text-gray-900">{course.rating}/5</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          {course.isEnrolled && (
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Materiales
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Añadir a Calendario
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir Progreso
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}