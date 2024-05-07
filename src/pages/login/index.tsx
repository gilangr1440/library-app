import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { LoginType, loginSchema } from "../../utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../../utils/apis/auth/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/contexts/auth";

const Login = () => {
  const navigate = useNavigate();
  const { changeToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (body: LoginType) => {
    try {
      const result = await userLogin(body);
      changeToken(result?.payload.token);
      if (result.message === "Login successfully") {
        toast.success(`${result.message}`, {
          position: "bottom-right",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (result.message === "User not found, you must register first.") {
        toast.error(`${result.message}`, {
          position: "bottom-right",
        });
        setTimeout(() => {
          navigate("/register");
        }, 3000);
      } else {
        toast.error(`${result.message}`, {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <div className="py-32">
        <div className="w-1/2 rounded-lg shadow p-8 border border-gray-200 mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">Login</h1>
            <h3 className="text-sm text-gray-500">Login to your account using email</h3>
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <br />
            <input
              type="email"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.email && "mb-8"}`}
              placeholder="name@mail.com"
              {...register("email")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-red-500 mb-8">{errors.email.message}</p>}
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <br />
            <input
              type="password"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.password && "mb-8"}`}
              placeholder="Password"
              {...register("password")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.password && <p className="text-sm text-red-500 mb-8">{errors.password.message}</p>}
            <div className="flex flex-col items-center">
              <button className="bg-black hover:bg-black/90 text-white text-sm text-semibold p-3 rounded-md w-11/12" disabled={isSubmitting} aria-disabled={isSubmitting}>
                Login
              </button>
              <div className="inline-flex items-center justify-center w-11/12">
                <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">OR</span>
              </div>
              <Link to={"/register"} className="bg-gray-200 hover:bg-black/90 hover:text-white text-center text-black text-sm text-semibold p-3 rounded-md w-11/12">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
