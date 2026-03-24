import "./ProfilePage.css";
import { useGetProfile } from "../../hooks/useProfile";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/navbar/Navbar";
import ProfileForm from "./ProfileForm";


const ProfilePage = () => {
  const { userProfile, setUserProfile, isLoading } = useGetProfile();

  if (isLoading || !userProfile ) {
    return (
      <>
        <Navbar />
        <ClipLoader
          cssOverride={{ display: "block", margin: "45vh auto" }}
          size={50}
          color="#4f6ef7"
        />
      </>
    );
  }


  return <ProfileForm userProfile={userProfile} setUserProfile={setUserProfile}/>;
};

export default ProfilePage;