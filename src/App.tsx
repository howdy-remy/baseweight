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
import { Pack } from "./features/pack/pack";
import { Packs } from "./features/packs/packs";

function App() {
  const { session, isLoadingSession } = useAuth();

  if (isLoadingSession) {
    return <div>...loading...</div>;
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Packs />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path="login" element={<Auth />} /> */}
        <Route path="/profiles/:username" element={<Profile />} />
        <Route path="/packs/:packId" element={<Pack />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
