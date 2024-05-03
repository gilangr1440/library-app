import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType, registerSchema } from "../../utils/apis/auth/types";
import { userRegister } from "../../utils/apis/auth/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  const handleRegister = async (body: RegisterType) => {
    try {
      const result = await userRegister(body);
      console.log(result);
      toast.success(`${result.message}`, {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <div className="py-32">
        <div className="w-1/2 rounded-lg shadow p-8 border border-gray-200 mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">Register</h1>
            <h3 className="text-sm text-gray-500">Register your account now to get full access</h3>
          </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <label htmlFor="name" className="text-sm font-semibold">
              Full Name
            </label>
            <br />
            <input
              type="text"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.full_name && "mb-8"}`}
              placeholder="John Doe"
              {...register("full_name")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.full_name && <p className="text-sm text-red-500 mb-8">{errors.full_name.message}</p>}
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
            <label htmlFor="role" className="text-sm font-semibold">
              Role
            </label>
            <br />
            <select
              id="role-select"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.email && "mb-8"}`}
              {...register("role")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            <label htmlFor="retype_password" className="text-sm font-semibold">
              Password Retype
            </label>
            <br />
            <input
              type="password"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.retype_password && "mb-8"}`}
              placeholder="Retype Password"
              {...register("retype_password")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.retype_password && <p className="text-sm text-red-500 mb-8">{errors.retype_password.message}</p>}
            <label htmlFor="address" className="text-sm font-semibold">
              Address
            </label>
            <br />
            <input
              type="text"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.address && "mb-8"}`}
              placeholder="Address"
              {...register("address")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.address && <p className="text-sm text-red-500 mb-8">{errors.address.message}</p>}
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <br />
            <input
              type="string"
              className={`w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 ${!errors.phone_number && "mb-8"}`}
              placeholder="Phone Number"
              {...register("phone_number")}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            />
            {errors.phone_number && <p className="text-sm text-red-500 mb-8">{errors.phone_number.message}</p>}
            <div className="flex flex-col items-center">
              <button className="bg-black hover:bg-black/90 text-white text-sm text-semibold p-3 rounded-md w-11/12" disabled={isSubmitting} aria-disabled={isSubmitting}>
                Register
              </button>
              <div className="inline-flex items-center justify-center w-11/12">
                <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">OR</span>
              </div>
              <Link to={"/login"} className="bg-gray-200 hover:bg-black/90 hover:text-white text-center text-black text-sm text-semibold p-3 rounded-md w-11/12">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
