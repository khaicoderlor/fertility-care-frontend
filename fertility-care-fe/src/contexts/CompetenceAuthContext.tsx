import { createContext, useContext, useState } from "react";
import { ROLE_DOCTOR } from "../constants/ApplicationConstant";
import axiosInstance from "../apis/AxiosInstance";

interface CompetenceAuthContextType {
  token: string | null;
  userProfileId: string | null;
  role: string | null;
  doctorId?: string | null;
  login: (token: string, userProfileId: string, role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const CompetenceAuthContext = createContext<
  CompetenceAuthContextType | undefined
>(undefined);

export const CompetenceAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const [userProfileId, setUserProfileId] = useState<string | null>(() =>
    localStorage.getItem("userProfileId")
  );
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role")
  );
  const [doctorId, setDoctorId] = useState<string | null>(() =>
    localStorage.getItem("doctorId")
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("accessToken") != null;
  });

  const login = async (t: string, u: string, r: string) => {
    localStorage.setItem("accessToken", t);
    localStorage.setItem("userProfileId", u);
    localStorage.setItem("role", r);
    setIsAuthenticated(true);
    setToken(t);
    setUserProfileId(u);
    setRole(r);

    if (r === ROLE_DOCTOR) {
      const response = await axiosInstance.get(`doctors/${u}/profiles`);
      const { id } = response.data.data;
      setDoctorId(id);
      localStorage.setItem("doctorId", id);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUserProfileId(null);
    setRole(null);
    setDoctorId(null);
  };

  return (
    <CompetenceAuthContext.Provider
      value={{
        token,
        userProfileId,
        role,
        doctorId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </CompetenceAuthContext.Provider>
  );
};

export const useCompetenceAuth = () => {
  const context = useContext(CompetenceAuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
