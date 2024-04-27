import Layout from "../../components/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="py-28">
        <div className="text-center">
          <div className="w-60 h-60 rounded-full mx-auto mb-5">
            <img className="w-full h-full object-cover rounded-full" src="https://source.unsplash.com/random?avatar" alt="Rounded avatar"></img>
          </div>
          <h1 className="text-2xl font-bold mb-8">John Doe</h1>
          <button className="bg-black hover:bg-gray-800 transition duration-300 text-sm text-white font-medium p-3 rounded-md">Edit Profile</button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
