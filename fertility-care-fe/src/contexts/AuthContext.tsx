import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (
    newToken: string,
    refreshToken: string,
    userProfileId: string,
    patientId: string
  ) => void;
  logout: () => void;
  patientId?: string | null;
  userProfileId?: string;
  orderIds?: string[] | null;
  isAuthenticated: boolean;
  setOrderIdList: (orderIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("accessToken") != null;
  });

  const [userProfileId, setUserProfileId] = useState<string>(() => {
    return localStorage.getItem("userProfileId") ?? "";
  });

  const [patientId, setPatientId] = useState<string | null>(() => {
    return localStorage.getItem("patientId");
  });

  const [orderIds, setOrderIds] = useState<string[] | null>(() => {
    const stored = localStorage.getItem("orderIds");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Lỗi parse orderIds từ localStorage:", stored, e);
      return null;
    }
  });

  const login = (
    newToken: string,
    refreshToken: string,
    userProfileId: string,
    patientId: string
  ) => {
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userProfileId", userProfileId);
    localStorage.setItem("patientId", patientId);
    setToken(newToken);
    setUserProfileId(userProfileId);
    setPatientId(patientId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setPatientId(null);
    setOrderIds(null);
    setUserProfileId("");
    setIsAuthenticated(false);
  };

  const setOrderIdList = (orderIds: string[]) => {
    localStorage.setItem("orderIds", JSON.stringify(orderIds));
    setOrderIds(orderIds);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        patientId,
        userProfileId,
        orderIds,
        isAuthenticated,
        setOrderIdList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
