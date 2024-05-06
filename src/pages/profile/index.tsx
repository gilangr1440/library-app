import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../utils/contexts/auth";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const editHandle = () => {
    navigate("/edit-profile");
  };

  return (
    <Layout>
      <div className="py-28">
        <div className="text-center">
          <div className="w-60 h-60 rounded-full mx-auto mb-5">
            <img className="w-full h-full object-cover rounded-full" src={`${user.profile_picture}`} alt="Rounded avatar"></img>
          </div>
          <h1 className="text-2xl font-bold mb-8">{user.full_name}</h1>
          <button className="bg-black hover:bg-gray-800 transition duration-300 text-sm text-white font-medium p-3 rounded-md" onClick={editHandle}>
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
