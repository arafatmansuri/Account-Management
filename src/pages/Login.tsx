import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Box } from "../components/ErrorSuccessBox";
import Input from "../components/Input";
import type { User } from "../types";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<User> = async (data) => {
    setIsSubmitted(true);
    const users: User[] = JSON.parse(localStorage.getItem("userData") || "[]");
    if (
      users.find(
        (user) =>
          user.username == data.username && user.password == data.password
      )
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      setIsAuthenticated(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Account Management
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              isError={errors["username"] ? true : false}
              label={"Username"}
              placeholder={"Enter your Username"}
              errorMessage={errors.username && errors.username.message}
              formHook={{
                ...register("username", {
                  required: "Username is required",
                }),
              }}
            />
            <Input
              isError={errors["password"] ? true : false}
              label={"Password"}
              placeholder={"Enter your password"}
              errorMessage={errors.password && errors.password.message}
              formHook={{
                ...register("password", {
                  required: "Password is required",
                }),
              }}
              type={"password"}
            />

            {isSubmitted && !isAuthenticated && (
              <Box type="error" message={"Invalid login credentials"} />
            )}

            <Button
              isDisabled={!isValid}
              type="submit"
              text={"Login"}
              varient="primary"
              isWidthFull={true}
            />
          </form>

          <div className="mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 underline"
              // className="text-sm text-slate-600 hover:text-slate-900"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
