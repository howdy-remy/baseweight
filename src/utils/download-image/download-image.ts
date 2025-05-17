import { supabase } from "lib/supabaseClient";

export const downloadImage = async (
  path: string,
  storageBin: string,
  setState?: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const { data, error } = await supabase.storage
      .from(storageBin)
      .download(path);
    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    setState?.(url);
  } catch (error: any) {
    console.log("Error downloading image: ", error.message);
  }
};
