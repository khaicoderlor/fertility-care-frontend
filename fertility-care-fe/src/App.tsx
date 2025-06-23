import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/order/BookingPage";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import PatientProgressPage from "./pages/patient/PatientProgressPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import FollowUpPatientProgressPage from "./pages/doctor/FollowUpPatientProgressPage";


function App() {


  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/progress" element={
            <PrivateRoute>
              <PatientProgressPage/>
            </PrivateRoute>
          }/>
          <Route path="/dashboard/doctor" element={<DoctorDashboard/>}/>
          <Route path="/follow-up/patient/progress" element={<FollowUpPatientProgressPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
