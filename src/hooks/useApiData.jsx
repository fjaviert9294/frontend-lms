import { useState, useEffect } from 'react';
import apiService from '../services/api';

// Hook para obtener cursos
export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getCourses(filters);
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [JSON.stringify(filters)]);

  return { courses, loading, error, refetch: fetchCourses };
};

// Hook para obtener un curso específico
export const useCourse = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getCourseById(courseId);
      setCourse(data.course);
    } catch (err) {
      setError(err.message);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  return { course, loading, error, refetch: fetchCourse };
};

// Hook para obtener cursos del usuario
export const useUserCourses = (userId, status = 'all') => {
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserCourses = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUserCourses(userId, status);
      setUserCourses(data.enrollments || []);
    } catch (err) {
      setError(err.message);
      setUserCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, [userId, status]);

  return { userCourses, loading, error, refetch: fetchUserCourses };
};

// Hook para obtener insignias del usuario
export const useUserBadges = () => {
  const [badges, setBadges] = useState({ earned_badges: [], available_badges: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBadges = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUserBadges();
      setBadges(data);
    } catch (err) {
      setError(err.message);
      setBadges({ earned_badges: [], available_badges: [] });
    } finally {
      setLoading(false);
    }
  };

  const checkAchievements = async () => {
    try {
      const data = await apiService.checkAchievements();
      if (data.newly_earned && data.newly_earned.length > 0) {
        // Actualizar badges después de verificar logros
        await fetchUserBadges();
        return data.newly_earned;
      }
      return [];
    } catch (err) {
      console.error('Error verificando logros:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchUserBadges();
  }, []);

  return { badges, loading, error, refetch: fetchUserBadges, checkAchievements };
};

// Hook para obtener notificaciones
export const useNotifications = (filters = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getNotifications(filters);
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch (err) {
      setError(err.message);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await apiService.markNotificationAsRead(notificationId);
      
      // Actualizar estado local
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marcando notificación como leída:', err);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      
      // Actualizar estado local
      const now = new Date().toISOString();
      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true, read_at: now }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marcando todas las notificaciones como leídas:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [JSON.stringify(filters)]);

  return { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};

// Hook para obtener estadísticas del usuario
export const useUserStats = (userId) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserStats = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUserStats(userId);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [userId]);

  return { stats, loading, error, refetch: fetchUserStats };
};

// Hook para datos del dashboard admin
export const useAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAdminDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error, refetch: fetchDashboardData };
};

// Hook para acciones de cursos (inscribirse, completar capítulos, etc.)
export const useCourseActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.enrollInCourse(courseId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeChapter = async (courseId, chapterId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.completeChapter(courseId, chapterId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rateCourse = async (courseId, rating, review = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.rateCourse(courseId, rating, review);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    enrollInCourse,
    completeChapter,
    rateCourse,
  };
};