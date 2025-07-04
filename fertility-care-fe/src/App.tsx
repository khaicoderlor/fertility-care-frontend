import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/order/BookingPage";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import FollowUpPatientProgressPage from "./pages/doctor/FollowUpPatientProgressPage";
import ProgressPage from "./pages/patient/ProgressPage";
import { CompetenceAuthProvider } from "./contexts/CompetenceAuthContext";
import RoleLoginPage from "./pages/auth/RoleLoginPage";
import CheckoutPage from "./pages/patient/CheckoutPage";
import PatientDashboardPage from "./pages/patient/PatientDashboardPage";
import ProfilePage from "./pages/patient/ProfilePage";
import OrderInfoListWrapper from "./components/progress/OrderInfoListWrapper";
import PaymentReturnPage from "./components/progress/PaymentReturnPage";
import PaymentHistoriesTable from "./components/progress/PaymentHistoriesTable";
import PatientTable from "./components/dashboard/doctor/PatientTable";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorFeedback from "./pages/doctor/DoctorFeedback";
import DoctorPost from "./pages/doctor/DoctorPost";
import DoctorSchedulePage from "./pages/doctor/DoctorSchedulePage";

function App() {
  return (
    <AuthProvider>
      <CompetenceAuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/competence/login" element={<RoleLoginPage />} />

          <Route
            path="/patient"
            element={
              <PrivateRoute>
                <PatientDashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrderInfoListWrapper />} />
            <Route
              path="payment-histories"
              element={<PaymentHistoriesTable />}
            />
          </Route>

          <Route
            path="/payment/payment-return"
            element={<PaymentReturnPage />}
          />

          <Route
            path="/order"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/orders/progress"
            element={
              <PrivateRoute>
                <ProgressPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/progress/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/follow-up/patient/progress"
            element={
              <PrivateRoute>
                <FollowUpPatientProgressPage />
              </PrivateRoute>
            }
          />

          <Route path="/doctor" element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }>
            <Route index element={<PatientTable/>}/> 
            <Route path="my-patients" element={<PatientTable/>}/>
            <Route path="my-profile" element={<DoctorProfile/>}/>
            <Route path="work-schedules" element={<DoctorSchedulePage/>}/>
            <Route path="my-feedback" element={<DoctorFeedback/>}/>
            <Route path="my-posts" element={<DoctorPost/>}/>
          </Route>
        </Routes>
      </CompetenceAuthProvider>
    </AuthProvider>
  );
}

export default App;
