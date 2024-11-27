import { Link } from "react-router";
import { useGetPacksQuery } from "../../services/packs";
import { useAuth } from "../../contexts/Authentication";
import React from "react";

export const Packs = () => {
  const { session } = useAuth();
  const { data: packs, isLoading } = useGetPacksQuery({
    userId: session?.user.id,
  });

  if (isLoading) {
    return "loading...";
  }

  return (
    <div>
      {packs?.map((pack) => (
        <React.Fragment key={pack.id}>
          <Link to={`packs/${pack.id}`}>{pack.name}</Link>
        </React.Fragment>
      ))}
    </div>
  );
};
