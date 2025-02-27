import "./App.css";
import Auth from "./Auth";
import Account from "./Account";
import { BrowserRouter, Route, Routes } from "react-router";
import { Profile } from "./Profile";
import { useAuth } from "./contexts/Authentication";
import { Pack } from "./features/pack/pack";
import { Packs } from "./features/packs/packs";
import { PublicPack } from "./features/publicPack/publicPack";
import { ProtectedRoute } from "components/ProtectedRoute";

function App() {
  const { isLoadingSession } = useAuth();

  if (isLoadingSession) {
    return <div>...loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route index element={<Packs />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packs/:packId"
          element={
            <ProtectedRoute>
              <Pack />
            </ProtectedRoute>
          }
        />

        <Route path="/u/:username" element={<Profile />} />
        <Route path="/p/:packId" element={<PublicPack />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
