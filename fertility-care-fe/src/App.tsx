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
                <PatientDashboardPage />
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrderInfoListWrapper />} />
          </Route>

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
            path="/doctor"
            element={
              <PrivateRoute>
                <DoctorDashboard />
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
        </Routes>
      </CompetenceAuthProvider>
    </AuthProvider>
  );
}

// function App() {
//   return (
//     <>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/order"
//             element={
//               <PrivateRoute>
//                 <BookingPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/patient"
//             element={
//               <PrivateRoute>
//                 <PatientProgressPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/progress"
//             element={
//               <PrivateRoute>
//                 <ProgressPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/patient/progress/checkout" element={
//             <PrivateRoute>
//               <CheckoutPage/>
//             </PrivateRoute>
//           }/>
//         </Routes>
//       </AuthProvider>

//       <CompetenceAuthProvider >
//         <Routes>
//           <Route path="/competence/login" element={<RoleLoginPage/>}/>
//           <Route path="/doctor" element={<DoctorDashboard />} />
//           <Route
//             path="/follow-up/patient/progress"
//             element={<FollowUpPatientProgressPage />}
//           />
//         </Routes>
//       </CompetenceAuthProvider>
//     </>
//   );
// }

export default App;
