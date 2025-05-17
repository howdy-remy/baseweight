import { ChangeEvent, useEffect, useState } from "react";
import { Buttons, Hero, HeroWrapper } from "./PackHero.styled";
import { IconButton } from "components/IconButton";
import { supabase } from "lib/supabaseClient";
import { downloadImage } from "utils/download-image";

type PackImageProps = {
  url?: null | string;
  onUpload: (filePath: string | null) => void;
};

export const PackHero = ({ url, onUpload }: PackImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      downloadImage(url, "pack-hero", setImageUrl);
    } else {
      setImageUrl(null);
    }
  }, [url]);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
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
        .from("pack-hero")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function removeImage() {
    if (!url) return;
    try {
      setUploading(true);

      const { error: uploadError } = await supabase.storage
        .from("pack-hero")
        .remove([url]);

      if (uploadError) {
        throw uploadError;
      }
      onUpload(null);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <HeroWrapper>
      {imageUrl ? (
        <Hero src={imageUrl} alt="hero image" />
      ) : (
        <Hero src="/topo.png" alt="topographic map pattern" />
      )}
      <Buttons>
        <IconButton
          as="label"
          icon="upload"
          variant="primary"
          htmlFor="uploader"
          data-testid="upload-button"
        />
        {imageUrl && (
          <IconButton icon="x" variant="primary" onClick={removeImage} />
        )}
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="uploader"
          accept="image/*"
          data-testid="hero-upload"
          onChange={uploadImage}
          disabled={uploading}
        />
      </Buttons>
    </HeroWrapper>
  );
};
