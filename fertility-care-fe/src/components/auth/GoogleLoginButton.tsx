import {
  GoogleLogin,
  GoogleOAuthProvider,
  type GoogleCredentialResponse,
} from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";

export const GoogleLoginButton = () => {
  const { login, setPatientInfo } = useAuth();

  const handleSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    try {
      console.log(credentialResponse);
      const res = await axiosInstance.post("/auth/google-login", {
        idToken: credentialResponse.credential,
      });

      const { accessToken, user } = res.data;
      console.log(user);
      login(accessToken, user.profileId);

      const info = await axiosInstance.get(`/patients/profile/${user.profileId}`);
      const res2 =  info.data.data;
      console.log("res2", res2);
      setPatientInfo(res2.patientId, res2.orderIds);

      Swal.fire({
        title: "Đăng nhập thành công",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Đăng nhập thất bại",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="my-4 text-center text-sm text-gray-500">Hoặc</div>
      <GoogleOAuthProvider clientId="104203791937-kcoraa38rte493rkn4f3thdic5u3c981.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Google login thất bại")}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </>
  );
};
