import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

import { AvatarImage, AvatarNoImage } from "./Avatar.styled";
import { TextSansBold } from "components/Typography";

type AvatarProps = {
  initial?: string;
  size: number;
  url: null | string;
};

export const Avatar = ({ initial = "?", size, url }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

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

  return (
    <div>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt="Avatar" size={size} />
      ) : (
        <AvatarNoImage size={size}>
          <TextSansBold>{initial}</TextSansBold>
        </AvatarNoImage>
      )}
    </div>
  );
};
