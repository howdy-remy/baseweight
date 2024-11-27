import { FormEventHandler, useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./contexts/Authentication";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "./services/profile";
import Avatar from "./Avatar";
import { Layout } from "./components/Layout/Layout";

export default function Account() {
  const { session } = useAuth();
  const { data: profile } = useGetProfileQuery({ userId: session?.user.id });

  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  useEffect(() => {
    if (!!profile) {
      setUsername(profile.username);
      setWebsite(profile.website);
    }
  }, [profile]);

  const [updateProfileMutation] = useUpdateProfileMutation();

  const updateAvatarUrl = async (avatarUrl: string) => {
    if (!session || !profile) return;
    updateProfileMutation({
      id: session.user?.id,
      username: profile.username,
      website: profile.website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    });
  };

  const updateProfile: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!session || !profile) return;
    updateProfileMutation({
      id: session.user?.id,
      username,
      website,
      avatar_url: profile.avatar_url,
      updated_at: new Date(),
    })
      .unwrap()
      .catch((error) => console.error("rejected", error));
  };

  if (!profile) {
    return;
  }

  return (
    <>
      <Layout>
        <form onSubmit={updateProfile} className="form-widget">
          <Avatar
            url={profile.avatar_url}
            size={150}
            onUpload={(_, url) => {
              updateAvatarUrl(url);
            }}
          />
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={session?.user.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
            <button className="button block primary" type="submit">
              Update
            </button>
          </div>

          <div>
            <button
              className="button block"
              type="button"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}
