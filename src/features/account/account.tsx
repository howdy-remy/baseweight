import { FormEventHandler, useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

import { useGetProfileQuery, useUpdateProfileMutation } from "api/profile";
import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout";
import { AvatarUploader } from "components/AvatarUploader";
import { StyledForm, Wrapper } from "./account.styled";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { HeadingOne } from "components/Typography";
import { Space } from "components/Space";

export const Account = () => {
  const { session } = useAuth();
  const { data: profile, refetch } = useGetProfileQuery({
    userId: session?.user.id,
  });

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
    await updateProfileMutation({
      id: session.user?.id,
      username: profile.username,
      website: profile.website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    });
    refetch();
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
        <Wrapper>
          <HeadingOne>Account Settings</HeadingOne>
          <Space size="xl" />

          <Field label="Avatar">
            <AvatarUploader
              url={profile.avatar_url}
              size={150}
              onUpload={(_, url) => {
                updateAvatarUrl(url);
              }}
            />
          </Field>
          <Space size="xl" />
          <StyledForm onSubmit={updateProfile}>
            <Field label="Email">
              <Input
                type="text"
                name="Email"
                isDisabled
                value={session?.user.email || ""}
                placeholder="email"
              />
            </Field>
            <Field label="Username">
              <Input
                type="text"
                name="Username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>

            <Button variant="primary" size="large" type="submit">
              Save
            </Button>
            <Space size="xl" />

            <Button
              variant="secondary"
              size="large"
              onClick={() => supabase.auth.signOut()}
            >
              Sign out
            </Button>
          </StyledForm>
        </Wrapper>
      </Layout>
    </>
  );
};
