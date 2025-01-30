import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const userData = await login(data.email, data.password);
      setAuth(userData);
      navigate('/dashboard');
    } catch (error) {
      console.log('Login failed',error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input {...register('email', { required: 'Email is required' , pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email format”' }})} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

        <label>Password:</label>
        <input type="password" {...register('password', { required: 'Password is required' , minLength: { value: 6, message: 'Password must be at least 6 characters' }})} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default Login;
