import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter,
  Star,
  Users,
  Play,
  CheckCircle,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { 
  useCourses, 
  useUserCourses, 
  useUserBadges, 
  useUserStats,
  useCourseActions 
} from '../hooks/useApiData'

export function DashboardComponent({ userData, onCourseSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [file, setFile] = useState<File | null>(null);

  // Hooks para obtener datos del backend
  const { 
    courses, 
    loading: coursesLoading, 
    error: coursesError, 
    refetch: refetchCourses 
  } = useCourses({ 
    search: searchTerm || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined
  })

  const { 
    userCourses, 
    loading: userCoursesLoading, 
    error: userCoursesError,
    refetch: refetchUserCourses 
  } = useUserCourses(userData?.id)

  const { 
    badges, 
    loading: badgesLoading, 
    error: badgesError,
    refetch: refetchBadges,
    checkAchievements 
  } = useUserBadges()

  const { 
    stats, 
    loading: statsLoading, 
    error: statsError,
    refetch: refetchStats 
  } = useUserStats(userData?.id)

  const { enrollInCourse, loading: enrollmentLoading } = useCourseActions()

  // Verificar logros automáticamente
  useEffect(() => {
    if (userData?.id && !badgesLoading) {
      checkAchievements().then(newBadges => {
        if (newBadges.length > 0) {
          newBadges.forEach(badge => {
            toast.success(`¡Nueva insignia obtenida! ${badge.badge.icon} ${badge.badge.name}`)
          })
        }
      })
    }
  }, [userData?.id, badgesLoading])

  const handleEnrollment = async (courseId, courseTitle) => {
    try {
      await enrollInCourse(courseId)
      toast.success(`¡Te has inscrito exitosamente en "${courseTitle}"!`)
      
      // Actualizar datos
      refetchCourses()
      refetchUserCourses()
      refetchStats()
    } catch (error) {
      toast.error(error.message || 'Error al inscribirse al curso')
    }
  }

  const handleRefreshData = async () => {
    try {
      await Promise.all([
        refetchCourses(),
        refetchUserCourses(),
        refetchBadges(),
        refetchStats()
      ])
      toast.success('Datos actualizados')
    } catch (error) {
      toast.error('Error al actualizar datos')
    }
  }

  // Filtrar cursos localmente también
  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  // Categorías únicas de los cursos
  const categories = [...new Set(courses.map(course => course.category_name).filter(Boolean))]
  const difficulties = ['Básico', 'Intermedio', 'Avanzado']

  return (
    <div className="space-y-6">
      {/* Header con stats */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl mb-2">¡Hola, {userData?.name}!</h1>
          <p className="text-gray-600">Continúa tu aprendizaje y alcanza tus metas</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefreshData}
          disabled={coursesLoading || userCoursesLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Cursos Completados</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando...</span>
              </div>
            ) : statsError ? (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Error</span>
              </div>
            ) : (
              <>
                <div className="text-2xl">{stats?.total_courses_completed || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{userCourses.filter(c => c.status === 'active').length} en progreso
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Insignias Obtenidas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {badgesLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando...</span>
              </div>
            ) : badgesError ? (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Error</span>
              </div>
            ) : (
              <>
                <div className="text-2xl">{badges.earned_badges?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {badges.available_badges?.length || 0} disponibles
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Racha Actual</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl">{stats?.current_streak_days || 0}</div>
                <p className="text-xs text-muted-foreground">días consecutivos</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tiempo Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Cargando...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl">
                  {stats?.total_time_spent_minutes ? 
                    Math.round(stats.total_time_spent_minutes / 60) : 0}h
                </div>
                <p className="text-xs text-muted-foreground">de aprendizaje</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Explorar Cursos</TabsTrigger>
          <TabsTrigger value="my-courses">Mis Cursos</TabsTrigger>
          <TabsTrigger value="badges">Mis Insignias</TabsTrigger>
        </TabsList>

        {/* Tab: Explorar Cursos */}
        <TabsContent value="courses" className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las dificultades</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>

          {/* Lista de cursos */}
          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : coursesError ? (
            <Card className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg mb-2">Error al cargar cursos</h3>
              <p className="text-gray-600 mb-4">{coursesError}</p>
              <Button onClick={refetchCourses}>Reintentar</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {course.category_name}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{course.rating_average?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.estimated_duration_hours}h
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.total_enrollments}
                      </span>
                      <Badge variant={
                        course.difficulty === 'Básico' ? 'default' :
                        course.difficulty === 'Intermedio' ? 'secondary' : 'destructive'
                      }>
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => onCourseSelect(course.id)}
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      
                      {!course.is_enrolled && (
                        <Button 
                          onClick={() => handleEnrollment(course.id, course.title)}
                          size="sm"
                          className="flex-1"
                          disabled={enrollmentLoading}
                        >
                          {enrollmentLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Inscribirse'
                          )}
                        </Button>
                      )}
                      
                      {course.is_enrolled && (
                        <Badge variant="default" className="flex-1 justify-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Inscrito
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!coursesLoading && !coursesError && filteredCourses.length === 0 && (
            <Card className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg mb-2">No se encontraron cursos</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay cursos disponibles en este momento'
                }
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Mis Cursos */}
        <TabsContent value="my-courses" className="space-y-4">
          {userCoursesLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userCoursesError ? (
            <Card className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg mb-2">Error al cargar mis cursos</h3>
              <p className="text-gray-600 mb-4">{userCoursesError}</p>
              <Button onClick={refetchUserCourses}>Reintentar</Button>
            </Card>
          ) : userCourses.length === 0 ? (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg mb-2">No estás inscrito en ningún curso</h3>
              <p className="text-gray-600 mb-4">Explora nuestro catálogo y comienza tu aprendizaje</p>
              <Button onClick={() => document.querySelector('[value="courses"]').click()}>
                Explorar Cursos
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {userCourses.map(enrollment => (
                <Card key={enrollment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg">{enrollment.title}</h3>
                          <p className="text-sm text-gray-600">
                            Instructor: {enrollment.instructor_name}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        enrollment.status === 'completed' ? 'default' :
                        enrollment.status === 'active' ? 'secondary' : 'destructive'
                      }>
                        {enrollment.status === 'completed' ? 'Completado' :
                         enrollment.status === 'active' ? 'En progreso' : 'Pausado'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{Math.round(enrollment.progress_percentage)}%</span>
                      </div>
                      <Progress value={enrollment.progress_percentage} className="w-full" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {enrollment.completed_chapters}/{enrollment.total_chapters} capítulos
                        </span>
                        <span>
                          Inscrito: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => onCourseSelect(enrollment.course_id)}
                      className="w-full"
                    >
                      {enrollment.status === 'completed' ? 'Revisar' : 'Continuar'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab: Mis Insignias */}
        <TabsContent value="badges" className="space-y-4">
          {badgesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : badgesError ? (
            <Card className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg mb-2">Error al cargar insignias</h3>
              <p className="text-gray-600 mb-4">{badgesError}</p>
              <Button onClick={refetchBadges}>Reintentar</Button>
            </Card>
          ) : (
            <>
              {badges.earned_badges?.length > 0 && (
                <div>
                  <h3 className="text-lg mb-4">Insignias Obtenidas ({badges.earned_badges.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {badges.earned_badges.map(badge => (
                      <Card key={badge.id} className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <h4 className="text-lg mb-1">{badge.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          <p className="text-xs text-gray-500">
                            Obtenida: {new Date(badge.earned_at).toLocaleDateString()}
                          </p>
                          {badge.course_title && (
                            <p className="text-xs text-blue-600 mt-1">
                              Por completar: {badge.course_title}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {badges.available_badges?.length > 0 && (
                <div>
                  <h3 className="text-lg mb-4">Insignias Disponibles ({badges.available_badges.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.available_badges.map(badge => (
                      <Card key={badge.id} className="text-center opacity-60 hover:opacity-80 transition-opacity">
                        <CardContent className="p-4">
                          <div className="text-4xl mb-2 grayscale">{badge.icon}</div>
                          <h4 className="text-lg mb-1">{badge.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {badge.rarity}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {badges.earned_badges?.length === 0 && badges.available_badges?.length === 0 && (
                <Card className="p-8 text-center">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No hay insignias disponibles</h3>
                  <p className="text-gray-600">Completa cursos para obtener insignias</p>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}