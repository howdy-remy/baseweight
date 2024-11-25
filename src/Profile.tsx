import { useState, useEffect, FormEventHandler } from "react";
import { supabase } from "./lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
import { useAuth } from "./contexts/Authentication";
import { useParams } from "react-router";

export const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  let { username } = useParams();

  useEffect(() => {
    if (profile) downloadImage(profile.avatar_url);
  }, [profile]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  useEffect(() => {
    async function getProfile() {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("username", username)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setProfile(data);
      }

      setLoading(false);
    }

    getProfile();
  }, []);

  return (
    <div>
      <img src={avatarUrl} height="100px" />
      <p>{profile?.username}</p>
      <p>{profile?.website}</p>
    </div>
  );
};
