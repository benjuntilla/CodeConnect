"use client";
import { createUserApolloClient } from "@/api/apollo";
import { searchProjects } from "@/api/project";
import { useState, useEffect } from "react";

export default function Login() {
  const [client] = useState(createUserApolloClient(""));
  useEffect(() => {
    searchProjects(client, "", "", 99, 1).then((data) => console.log(data));
  }, []);
  return <>Fuck</>;
}
