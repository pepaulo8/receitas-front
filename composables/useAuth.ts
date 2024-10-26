import api from '~/composables/api';
import { useRouter } from 'vue-router';  
import { jwtDecode } from 'jwt-decode'; 
import { useAuthStore } from '~/stores/authStore';  

interface JwtPayload {
  login: string;
  sub: string;
}

export const useAuth = () => {
  const router = useRouter();  
  const authStore = useAuthStore();

  const login = async (login: string, senha: string) => {
    try {
      const response = await api.post('/auth/login', {
        login,
        senha,
      });

      const token = response.data.access_token;

  
      localStorage.setItem('token', token);

  
      const decoded: JwtPayload = jwtDecode(token);
      const user = {
        login: decoded.login,
        id: decoded.sub
      };

  
      localStorage.setItem('user', JSON.stringify(user));

  
      authStore.setToken(token);
      authStore.setUser(user);

  
      router.push('/receitas');

      return token;
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  };

  return { login };
};


