import { BrowserRouter, Route, Routes, useNavigate } from "react-router";

import { useAuth } from "contexts/Authentication";

import { Account } from "features/account";
import { Profile } from "./Profile";

import { Pack } from "features/pack";
import { Packs } from "features/packs";
import { PublicPack } from "features/public-pack";

import { ProtectedRoute } from "components/ProtectedRoute";
import { Login } from "features/login";
import { Gear } from "features/gear";

function App() {
  const { isLoadingSession, session } = useAuth();

  if (isLoadingSession) {
    return <div>...loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <ProtectedRoute>
              <Packs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="packs">
          <Route
            path=":packId"
            element={
              <ProtectedRoute>
                <Pack />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/gear"
          element={
            <ProtectedRoute>
              <Gear />
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
