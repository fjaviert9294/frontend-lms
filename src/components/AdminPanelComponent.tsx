import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { 
  Users, 
  BookOpen, 
  Plus, 
  Upload, 
  Settings, 
  BarChart3,
  Edit,
  Trash2,
  Eye,
  Download,
  UserCheck,
  Award,
  TrendingUp,
  Calendar,
  ChevronLeft
} from 'lucide-react'

interface AdminPanelProps {
  onBack: () => void
}

// Datos mockeados para el panel de administración
const mockStats = {
  totalUsers: 1248,
  totalCourses: 45,
  completedCourses: 3421,
  totalBadges: 156,
  activeUsers: 892,
  newUsersThisMonth: 89
}

const mockUsers = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@empresa.com',
    role: 'student',
    joinDate: '2024-01-15',
    coursesCompleted: 12,
    badges: 8,
    lastActive: '2024-08-23',
    status: 'active'
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    email: 'carlos@empresa.com',
    role: 'admin',
    joinDate: '2023-12-01',
    coursesCompleted: 25,
    badges: 15,
    lastActive: '2024-08-23',
    status: 'active'
  },
  {
    id: '3',
    name: 'Ana López',
    email: 'ana@empresa.com',
    role: 'student',
    joinDate: '2024-02-20',
    coursesCompleted: 8,
    badges: 5,
    lastActive: '2024-08-22',
    status: 'active'
  }
]

const mockCourses = [
  {
    id: '1',
    title: 'Fundamentos de Liderazgo Digital',
    instructor: 'Dr. Ana Martínez',
    category: 'Liderazgo',
    duration: '4 horas',
    chapters: 8,
    enrolledStudents: 156,
    completionRate: 78,
    status: 'published',
    createdDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'Comunicación Efectiva en Equipos',
    instructor: 'Lic. Carlos Rodríguez',
    category: 'Comunicación',
    duration: '3.5 horas',
    chapters: 6,
    enrolledStudents: 203,
    completionRate: 85,
    status: 'published',
    createdDate: '2024-02-15'
  },
  {
    id: '3',
    title: 'Seguridad Cibernética Empresarial',
    instructor: 'Ing. Roberto Silva',
    category: 'Seguridad',
    duration: '6 horas',
    chapters: 12,
    enrolledStudents: 89,
    completionRate: 62,
    status: 'draft',
    createdDate: '2024-08-01'
  }
]

export function AdminPanelComponent({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    duration: '',
    difficulty: 'Básico'
  })

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para crear el curso
    console.log('Creando curso:', newCourse)
    // Reset form
    setNewCourse({
      title: '',
      description: '',
      instructor: '',
      category: '',
      duration: '',
      difficulty: 'Básico'
    })
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
            <h1 className="text-2xl text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona usuarios, cursos y contenido del LMS</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usuarios</p>
              <p className="text-2xl text-gray-900">{mockStats.totalUsers}</p>
              <p className="text-sm text-green-600 mt-1">+{mockStats.newUsersThisMonth} este mes</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cursos</p>
              <p className="text-2xl text-gray-900">{mockStats.totalCourses}</p>
              <p className="text-sm text-blue-600 mt-1">5 publicados este mes</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <p className="text-2xl text-gray-900">{mockStats.activeUsers}</p>
              <p className="text-sm text-purple-600 mt-1">71% del total</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cursos Completados</p>
              <p className="text-2xl text-gray-900">{mockStats.completedCourses}</p>
              <p className="text-sm text-orange-600 mt-1">↗ 12% vs mes anterior</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="create">Crear Curso</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Actividad Reciente</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">5 nuevos usuarios registrados</p>
                      <p className="text-xs text-gray-500">Hace 2 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Curso "Liderazgo Digital" actualizado</p>
                      <p className="text-xs text-gray-500">Hace 4 horas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Award className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">15 insignias otorgadas hoy</p>
                      <p className="text-xs text-gray-500">Hace 6 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Plus className="h-6 w-6" />
                    <span>Crear Curso</span>
                  </Button>
                  
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Upload className="h-6 w-6" />
                    <span>Subir Contenido</span>
                  </Button>
                  
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <BarChart3 className="h-6 w-6" />
                    <span>Ver Reportes</span>
                  </Button>
                  
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Settings className="h-6 w-6" />
                    <span>Configuración</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-gray-900">Gestión de Usuarios</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Usuario
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Usuario</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Rol</th>
                      <th className="text-left p-3">Cursos</th>
                      <th className="text-left p-3">Insignias</th>
                      <th className="text-left p-3">Estado</th>
                      <th className="text-left p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">Desde {user.joinDate}</div>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{user.email}</td>
                        <td className="p-3">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Admin' : 'Estudiante'}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-900">{user.coursesCompleted}</td>
                        <td className="p-3 text-sm text-gray-900">{user.badges}</td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-green-600">
                            Activo
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-gray-900">Gestión de Cursos</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm" onClick={() => setActiveTab('create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Curso
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {mockCourses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg text-gray-900">{course.title}</h4>
                          <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                            {course.status === 'published' ? 'Publicado' : 'Borrador'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="block">Instructor</span>
                            <span className="text-gray-900">{course.instructor}</span>
                          </div>
                          <div>
                            <span className="block">Estudiantes</span>
                            <span className="text-gray-900">{course.enrolledStudents}</span>
                          </div>
                          <div>
                            <span className="block">Completado</span>
                            <span className="text-gray-900">{course.completionRate}%</span>
                          </div>
                          <div>
                            <span className="block">Duración</span>
                            <span className="text-gray-900">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <div className="max-w-2xl">
              <h3 className="text-lg text-gray-900 mb-6">Crear Nuevo Curso</h3>
              
              <form onSubmit={handleCreateCourse} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del curso</Label>
                    <Input
                      id="title"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ej: Fundamentos de Liderazgo"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
                      placeholder="Nombre del instructor"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe el contenido y objetivos del curso"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={newCourse.category} onValueChange={(value) => setNewCourse(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="liderazgo">Liderazgo</SelectItem>
                        <SelectItem value="comunicacion">Comunicación</SelectItem>
                        <SelectItem value="productividad">Productividad</SelectItem>
                        <SelectItem value="seguridad">Seguridad</SelectItem>
                        <SelectItem value="innovacion">Innovación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificultad</Label>
                    <Select value={newCourse.difficulty} onValueChange={(value) => setNewCourse(prev => ({ ...prev, difficulty: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Básico">Básico</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración</Label>
                    <Input
                      id="duration"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Ej: 4 horas"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Curso
                  </Button>
                  <Button type="button" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Contenido
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}