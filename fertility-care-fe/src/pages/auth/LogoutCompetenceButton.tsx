import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";

const LogoutCompetenceButton = () => {
  const navigate = useNavigate();
  const { logout } = useCompetenceAuth();

  const handleLogout = async () => {
    try {
      logout();
      Swal.fire("Đăng xuất thành công!", "", "success");
      navigate("/competence/login");
    } catch (error) {
      console.error("Logout failed", error);
      Swal.fire("Lỗi", "Không thể đăng xuất!", "error");
    }
  };

  return (
    <div className="p-4 border-t">
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        Đăng xuất
      </button>
    </div>
  );
};

export default LogoutCompetenceButton;
