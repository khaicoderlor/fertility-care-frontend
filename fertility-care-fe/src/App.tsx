import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/order/BookingPage";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import PatientProgressPage from "./pages/patient/PatientDashboardPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import FollowUpPatientProgressPage from "./pages/doctor/FollowUpPatientProgressPage";
import ProgressPage from "./pages/patient/ProgressPage";
import { CompetenceAuthProvider } from "./contexts/CompetenceAuthContext";
import RoleLoginPage from "./pages/auth/RoleLoginPage";
import CheckoutPage from "./pages/patient/CheckoutPage";

function App() {
  return (
    <AuthProvider>
      <CompetenceAuthProvider>
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
          <Route
            path="/patient"
            element={
              <PrivateRoute>
                <PatientProgressPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/progress"
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
          <Route path="/competence/login" element={<RoleLoginPage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route
            path="/follow-up/patient/progress"
            element={<FollowUpPatientProgressPage />}
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
