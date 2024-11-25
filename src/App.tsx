import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import { Session } from "@supabase/supabase-js";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Profile } from "./Profile";
import { useAuth } from "./contexts/Authentication";

function App() {
  const { session } = useAuth();

  if (!session) {
    return <Auth />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Auth />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

// <div className="container" style={{ padding: "50px 0 100px 0" }}>
// {!session ? (
//   <Auth />
// ) : (
//   <Account key={session.user.id} session={session} />
// )}
// </div>
export default App;
