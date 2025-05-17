import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

import { AvatarImage, AvatarNoImage } from "./Avatar.styled";
import { TextSansBold } from "components/Typography";
import { downloadImage } from "utils/download-image";

type AvatarProps = {
  initial?: string;
  size: number;
  url: null | string;
};

export const Avatar = ({ initial = "?", size, url }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) downloadImage(url, "avatars", setAvatarUrl);
  }, [url]);

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
