import React from "react";
import {User} from "@nextui-org/react";
import {Skeleton} from "@nextui-org/react";

type UserAdminProps = {
  name: string | null | undefined,
  email: string | null | undefined,
  image: string | null | undefined
}

export function UserAdmin({name, email, image}: UserAdminProps) {
  return (
    <User   
      name={name}
      description={email}
      avatarProps={{
        src: `${image}`
      }}
      className="my-4"
    />
  );
}
