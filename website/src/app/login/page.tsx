"use client";
import { createApolloClient } from "@/lib/apollo";
import { searchProjects } from "@/lib/api/project";
import { useState, useEffect } from "react";

export default function Login() {
  const [client] = useState(createApolloClient());
  useEffect(() => {
    searchProjects(client, "", "", 99, 1).then((data) => console.log(data));
  }, []);
  return <>Fuck</>;
}
