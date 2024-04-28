import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="py-32">
        <div className="w-1/2 rounded-lg shadow p-8 border border-gray-200 mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">Login</h1>
            <h3 className="text-sm text-gray-500">Login to your account using email</h3>
          </div>
          <form action="">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <br />
            <input type="email" name="email" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="name@mail.com" />
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <br />
            <input type="password" name="password" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Password" />
            <div className="flex flex-col items-center">
              <button className="bg-black hover:bg-black/90 text-white text-sm text-semibold p-3 rounded-md w-11/12">Login</button>
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
