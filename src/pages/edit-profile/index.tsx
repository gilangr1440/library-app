import Layout from "../../components/Layout";

const EditProfile = () => {
  return (
    <Layout>
      <div className="py-28">
        <form action="" className="mx-10">
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
          <div className="flex gap-5">
            <button className="bg-black hover:bg-black/70 text-white text-sm text-semibold p-3 rounded-md w-11/12">Submit</button>
            <button className="bg-red-500 hover:bg-red-500/70 text-white text-sm text-semibold p-3 rounded-md w-11/12">Delete Account</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
