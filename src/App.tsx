import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/*
|---------------------------------------------------------------------
|                             Routes
|---------------------------------------------------------------------
*/

import {  AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/redirects/NotFound";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Denied from "./pages/auth/Denied";
import AuthLayout from "./layouts/AuthLayout";
import Users from "./pages/users/Users";
import MyProfile from "./pages/profile/MyProfile";
import HomeLayout from "./layouts/HomeLayout";
import Signin from "./pages/auth/Signin";
import Dashboard from "./pages/home/Dashboard";
import Memberships from "./pages/memberships/Memberships";
import Years from "./pages/years/Years";
import Members from "./pages/members/Members";
import Payments from "./pages/payments/Payments";
import Corporates from "./pages/members/Corporates";
import Manage from "./pages/manage/Manage";
import Member from "./pages/members/Member";
import Institute from "./pages/institute/Institute";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/denied" element={<Denied />} />
          </Route>
          <Route element={<HomeLayout />}></Route>
          <Route element={<MainLayout />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Members />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members/:id"
              element={
                <ProtectedRoute>
                  <Member />
                </ProtectedRoute>
              }
            />
            <Route
              path="/corporates"
              element={
                <ProtectedRoute>
                  <Corporates />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage"
              element={
                <ProtectedRoute>
                  <Manage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage/years"
              element={
                <ProtectedRoute>
                  <Years />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage/memberships"
              element={
                <ProtectedRoute>
                  <Memberships />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manage/institute"
              element={
                <ProtectedRoute>
                  <Institute />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = sessionStorage.getItem('token');
  let location = useLocation();
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default App;
