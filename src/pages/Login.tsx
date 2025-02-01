/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const userData = await login(data.email, data.password);
      toast.success(`Login successful`);
      debugger;
      setAuth(userData);
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      toast.error(`Login failed`);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>

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

                  <Button
                    loading={loading}
                    type="submit"
                    label="Login"
                    className="mt-2 w-full"
                  />
                </form>
                <hr className="my-8" />
                <p className="mt-4">
                  <a
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href=""
                  >
                    Forgot your password?
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href=""
                  >
                    Create account
                  </a>
                </p>
              </div>
            </div>

            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="/login-office.jpeg"
                alt="Office"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
