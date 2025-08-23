import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Award, 
  BookOpen, 
  Calendar, 
  Trophy, 
  Target,
  TrendingUp,
  Clock,
  Star,
  ChevronLeft,
  Download,
  Share2
} from 'lucide-react'

interface UserProfileProps {
  userData: any
  onBack: () => void
}

// Datos mockeados para el perfil
const mockLearningHistory = [
  {
    id: '1',
    courseTitle: 'Comunicación Efectiva en Equipos',
    completedDate: '2024-08-20',
    duration: '3.5 horas',
    grade: 95,
    category: 'Comunicación',
    badgeEarned: 'Comunicador'
  },
  {
    id: '2',
    courseTitle: 'Gestión del Tiempo',
    completedDate: '2024-08-15',
    duration: '2 horas',
    grade: 88,
    category: 'Productividad',
    badgeEarned: null
  },
  {
    id: '3',
    courseTitle: 'Fundamentos de Liderazgo',
    completedDate: '2024-08-10',
    duration: '4 horas',
    grade: 92,
    category: 'Liderazgo',
    badgeEarned: 'Líder Emergente'
  }
]

const mockBadges = [
  {
    id: '1',
    name: 'Novato',
    description: 'Completa tu primer curso',
    icon: '🎯',
    earned: true,
    earnedDate: '2024-01-15',
    rarity: 'común'
  },
  {
    id: '2',
    name: 'Comunicador',
    description: 'Completa cursos de comunicación',
    icon: '💬',
    earned: true,
    earnedDate: '2024-08-20',
    rarity: 'raro'
  },
  {
    id: '3',
    name: 'Líder Emergente',
    description: 'Completa 3 cursos de liderazgo',
    icon: '👑',
    earned: true,
    earnedDate: '2024-08-10',
    rarity: 'épico'
  },
  {
    id: '4',
    name: 'Experto en Seguridad',
    description: 'Completa 5 cursos de seguridad',
    icon: '🛡️',
    earned: false,
    progress: 60,
    rarity: 'legendario'
  },
  {
    id: '5',
    name: 'Maratón de Aprendizaje',
    description: 'Completa 10 cursos en un mes',
    icon: '🏃‍♂️',
    earned: false,
    progress: 30,
    rarity: 'épico'
  }
]

const mockSkills = [
  { name: 'Liderazgo', level: 85, courses: 5 },
  { name: 'Comunicación', level: 90, courses: 3 },
  { name: 'Productividad', level: 75, courses: 4 },
  { name: 'Trabajo en Equipo', level: 80, courses: 2 },
  { name: 'Seguridad Digital', level: 60, courses: 2 }
]

export function UserProfileComponent({ userData, onBack }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    department: 'Tecnología',
    position: 'Desarrollador Senior'
  })

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando cambios:', editData)
    setIsEditing(false)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'común': return 'bg-gray-100 text-gray-700'
      case 'raro': return 'bg-blue-100 text-blue-700'
      case 'épico': return 'bg-purple-100 text-purple-700'
      case 'legendario': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
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
            <h1 className="text-2xl text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información y revisa tu progreso</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir Perfil
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Progreso
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                {userData?.name?.charAt(0) || 'U'}
              </div>
              
              <div className="mb-4">
                {!isEditing ? (
                  <>
                    <h2 className="text-xl text-gray-900 mb-1">{userData?.name}</h2>
                    <p className="text-gray-600 mb-2">{editData.position}</p>
                    <p className="text-sm text-gray-500">{editData.department}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre"
                    />
                    <Input
                      value={editData.position}
                      onChange={(e) => setEditData(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Cargo"
                    />
                    <Input
                      value={editData.department}
                      onChange={(e) => setEditData(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Departamento"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Cursos completados</span>
                </div>
                <span className="text-gray-900">{userData?.completedCourses || 12}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">Insignias ganadas</span>
                </div>
                <span className="text-gray-900">{userData?.totalBadges || 8}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Racha actual</span>
                </div>
                <span className="text-gray-900">{userData?.currentStreak || 15} días</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Tiempo total</span>
                </div>
                <span className="text-gray-900">45h</span>
              </div>
            </div>
          </Card>

          {/* Learning Goals */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg text-gray-900 mb-4">Metas de Aprendizaje</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Meta mensual</span>
                  <span className="text-sm text-gray-900">2/3 cursos</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Insignias objetivo</span>
                  <span className="text-sm text-gray-900">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="history" className="space-y-6">
            <TabsList>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="badges">Insignias</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="certificates">Certificados</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Historial de Aprendizaje</h3>
                <div className="space-y-4">
                  {mockLearningHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{item.courseTitle}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {item.completedDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </span>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-gray-900">{item.grade}%</span>
                        </div>
                        {item.badgeEarned && (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            <Award className="h-3 w-3 mr-1" />
                            {item.badgeEarned}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="badges">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Mis Insignias</h3>
                  <div className="text-sm text-gray-600">
                    {mockBadges.filter(b => b.earned).length} de {mockBadges.length} conseguidas
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBadges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`p-4 rounded-lg border-2 ${
                        badge.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`text-3xl ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                          {badge.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                              {badge.name}
                            </h4>
                            <Badge className={getRarityColor(badge.rarity)} variant="secondary">
                              {badge.rarity}
                            </Badge>
                          </div>
                          <p className={`text-sm ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                            {badge.description}
                          </p>
                          {badge.earned ? (
                            <p className="text-xs text-green-600 mt-2">
                              Conseguida el {badge.earnedDate}
                            </p>
                          ) : badge.progress ? (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>Progreso</span>
                                <span>{badge.progress}%</span>
                              </div>
                              <Progress value={badge.progress} className="h-1" />
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 mt-2">Sin comenzar</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Mis Habilidades</h3>
                <div className="space-y-6">
                  {mockSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">{skill.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{skill.level}%</span>
                          <Badge variant="outline">{skill.courses} cursos</Badge>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-3" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h4 className="text-blue-900">Recomendación</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Para mejorar tu habilidad en "Seguridad Digital", te recomendamos completar el curso 
                    "Seguridad Cibernética Empresarial".
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Mis Certificados</h3>
                <div className="space-y-4">
                  {mockLearningHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Trophy className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">{item.courseTitle}</h4>
                          <p className="text-sm text-gray-600">Completado el {item.completedDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Todos los Certificados
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}