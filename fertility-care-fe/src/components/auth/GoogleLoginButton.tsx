import {
  GoogleLogin,
  GoogleOAuthProvider,
  type GoogleCredentialResponse,
} from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";

export const GoogleLoginButton = () => {
  const { login, setOrderIdList } = useAuth();

  const handleSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    try {
      console.log(credentialResponse);
      const res = await axiosInstance.post("/auth/google-login", {
        idToken: credentialResponse.credential,
      });

      const { accessToken, refreshToken, user } = res.data;
      
      login(accessToken, refreshToken, user.profileId, user.patientId);
      setOrderIdList(user.orderIds);

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
