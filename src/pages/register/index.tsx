import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Register = () => {
  return (
    <Layout>
      <div className="py-32">
        <div className="w-1/2 rounded-lg shadow p-8 border border-gray-200 mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">Register</h1>
            <h3 className="text-sm text-gray-500">Register your account now to get full access</h3>
          </div>
          <form action="">
            <label htmlFor="name" className="text-sm font-semibold">
              Full Name
            </label>
            <br />
            <input type="text" name="name" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="John Doe" />
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
            <label htmlFor="passwordretype" className="text-sm font-semibold">
              Password Retype
            </label>
            <br />
            <input type="password" name="passwordretype" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Retype Password" />
            <label htmlFor="address" className="text-sm font-semibold">
              Address
            </label>
            <br />
            <input type="text" name="address" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Address" />
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone Number
            </label>
            <br />
            <input type="text" name="phone" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Phone Number" />
            <div className="flex flex-col items-center">
              <button className="bg-black hover:bg-black/90 text-white text-sm text-semibold p-3 rounded-md w-11/12">Register</button>
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
