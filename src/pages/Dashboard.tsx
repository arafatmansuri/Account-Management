import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Box } from "../components/ErrorSuccessBox";
import Input from "../components/Input";
import type { User } from "../types";

const Dashboard = () => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("currentUser") || "[]")
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<User> = async (data) => {
    const users: User[] = JSON.parse(localStorage.getItem("userData") || "[]");
    if (
      users.find(
        (u) => u.username == data.username && u.username != user.username
      )
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSubmitted(true);
    localStorage.setItem(
      "userData",
      JSON.stringify(
        users.map((u) => {
          if (u.username == user.username) {
            return { ...data };
          }
          return u;
        })
      )
    );
    localStorage.setItem("currentUser", JSON.stringify(data));
    setUser(data);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsEditable(false);
    }, 2000);
  };
  useEffect(() => {
    if (localStorage.getItem("currentUser") == "") {
      navigate("/");
    }
  }, []);
  return (
    <div className="md:p-8 p-5">
      <div className="mb-8 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Your Account
          </h1>
          <p className="text-slate-600">View and manage your account</p>
        </div>
        <div>
          <Button
            text="Logout"
            varient="assign"
            onClick={() => {
              localStorage.setItem("currentUser", "");
              navigate("/");
            }}
            classes=""
          />
        </div>
      </div>

      {!isEditable && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center">
            {/* <h1 className="text-xl font-semibold">username:</h1>{" "} */}
            <p className="text-lg">Welcome, {user.username}</p>
          </div>
          <Button
            text="Edit"
            varient="primary"
            isWidthFull={false}
            classes="w-32"
            onClick={() => setIsEditable(true)}
          />
        </div>
      )}
      {isEditable && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            isError={errors["username"] ? true : false}
            label={"Username"}
            placeholder={"Enter your Username"}
            errorMessage={errors.username && errors.username.message}
            formHook={{
              ...register("username", {
                required: "Username is required",
                value: user.username,
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
                value: user.password,
              }),
            }}
            type={"password"}
          />

          {isSubmitted && (
            <Box type="success" message={"changes made successfully"} />
          )}
          {isError && <Box type="error" message={"User already exists"} />}

          <div className="flex gap-4">
            <Button
              isDisabled={!isValid}
              type="submit"
              text={"Edit"}
              varient="primary"
              classes="flex-1"
              isWidthFull={true}
            />
            <Button
              type="reset"
              text={"Cancel"}
              varient="secondary"
              onClick={() => {
                setIsSubmitted(false);
                setIsEditable(false);
                setIsError(false);
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
