import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "../../components/Layout";
import { useAuth } from "../../utils/contexts/auth";
import { IUserType, userSchema } from "../../utils/apis/users/types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { deleteUser, editUser } from "../../utils/apis/users/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      retype_password: "",
      phone_number: "",
      address: "",
      profile_picture: "",
    },
  });

  useEffect(() => {
    setValue("email", user?.email as string);
    setValue("full_name", user?.full_name as string);
    setValue("phone_number", user?.phone_number as string);
    setValue("address", user?.address as string);
  }, [user]);

  const handleUpdateUser = async (body: IUserType) => {
    try {
      const result = await editUser(body);
      toast.success(`${result.message}`, {
        position: "bottom-right",
      });
    } catch (error: any) {
      console.log(error.reponse);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser();
      toast.error(`${result.message}`, {
        position: "bottom-right",
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <div className="py-28">
        <form onSubmit={handleSubmit(handleUpdateUser)} className="mx-10">
          <label htmlFor="name" className="text-sm font-semibold">
            Full Name
          </label>
          <br />
          <input type="text" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="John Doe" {...register("full_name")} defaultValue={user?.full_name} />
          <p className="text-sm text-red-500 ">{errors.full_name && errors.full_name.message}</p>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <br />
          <input type="email" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="name@mail.com" {...register("email")} defaultValue={user?.email} />
          <p className="text-sm text-red-500 ">{errors.email && errors.email.message}</p>
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <br />
          <input type="password" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Password" {...register("password")} />
          <p className="text-sm text-red-500 ">{errors.password && errors.password.message}</p>
          <label htmlFor="passwordretype" className="text-sm font-semibold">
            Password Retype
          </label>
          <br />
          <input
            type="password"
            className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8"
            placeholder="Retype Password"
            {...register("retype_password")}
            defaultValue={user?.retype_password}
          />
          <p className="text-sm text-red-500 ">{errors.retype_password && errors.retype_password.message}</p>
          <label htmlFor="address" className="text-sm font-semibold">
            Address
          </label>
          <br />
          <input type="text" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Address" {...register("address")} defaultValue={user?.address} />
          <p className="text-sm text-red-500 ">{errors.address && errors.address.message}</p>
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone Number
          </label>
          <br />
          <input type="text" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" placeholder="Phone Number" {...register("phone_number")} defaultValue={user?.phone_number} />
          <p className="text-sm text-red-500 ">{errors.phone_number && errors.phone_number.message}</p>
          <label htmlFor="photo" className="text-sm font-semibold">
            Profile Picture
          </label>
          <br />
          <input type="file" className="w-full text-sm p-3 rounded-md border border-gray-300 focus:outline outline-offset-2 outline-2 mt-2 mb-8" {...register("profile_picture")} />
          <p className="text-sm text-red-500 ">{errors.profile_picture && errors.profile_picture.message}</p>
          <div className="flex gap-5">
            <button className="bg-black hover:bg-black/70 text-white text-sm text-semibold p-3 rounded-md w-11/12">Submit</button>
            <button type="button" onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-500/70 text-white text-sm text-semibold p-3 rounded-md w-11/12">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
