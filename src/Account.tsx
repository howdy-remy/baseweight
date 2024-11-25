import { useState, useEffect, FormEventHandler } from "react";
import { supabase } from "./lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
import { useAuth } from "./contexts/Authentication";
import { Link } from "react-router";

export default function Account() {
  const { session } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;
    async function getProfiles() {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("username");
      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setProfiles(data);
        }
      }

      setLoading(false);
    }

    getProfiles();

    async function getProfile() {
      setLoading(true);
      const { user } = session || {};

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event: SubmitEvent, avatarUrl: string) => {
    event.preventDefault();

    setLoading(true);
    const { user } = session || {};

    const updates = {
      id: user?.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={updateProfile} className="form-widget">
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(event, url) => {
            updateProfile(event, url);
          }}
        />
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session?.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button block primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
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
      <div>
        {profiles.map((profile) => (
          <Link key={profile.username} to={`profiles/${profile.username}`}>
            {profile.username}
          </Link>
        ))}
      </div>
    </>
  );
}
