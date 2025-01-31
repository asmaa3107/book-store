/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { Button } from "primereact/button";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const userData = await login(data.email, data.password);
      toast.success(`Login successful`);
      setAuth(userData);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`Login failed`);
    }
  };

  return (
    <div className="login-container">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              labelText="Email"
              type="text"
              placeholder="Enter your email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email format”",
                },
              })}
              errorMessage={errors.email?.message}
            />

            <InputField
              labelText="Password"
              type="password"
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              errorMessage={errors.password?.message}
            />

            <Button type="submit" label="Login" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
