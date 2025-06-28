import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";
import { AvatarImage, AvatarNoImage } from "./AvatarUploader.styled";
import { TextSansBold } from "components/Typography";
import { downloadImage } from "utils/download-image";
import { IconButton } from "components/IconButton";
import { Button } from "components/Button";
import { Space } from "components/Space";

type AvatarUploaderProps = {
  url: null | string;
  size: number;
  initial?: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>, filePath: string) => void;
};
export const AvatarUploader = ({
  url,
  size,
  initial = "?",
  onUpload,
}: AvatarUploaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      downloadImage(url, "avatars", setAvatarUrl);
    }
  }, [url]);

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      onUpload(event, filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
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
      <Space size="l" />
      <Button
        as="label"
        variant="primary"
        htmlFor="uploader"
        data-testid="upload-button"
        size="medium"
      >
        Upload avatar image
      </Button>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
        type="file"
        id="uploader"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  );
};
