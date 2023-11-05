"use client";

import { searchProjects } from "@/lib/api/project";
import { useState } from "react";
import { useUserContext } from "./UserProvider";

export default function SearchBar() {
  const context = useUserContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = async () => {
    try {
      const skills = "";
      const page_size = 10;
      const page_number = 1;
      const results = await searchProjects(
        context.client,
        searchTerm,
        skills,
        page_size,
        page_number,
      );
      console.log(results);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full max-w-xs"
        onChange={(e) => {
          e.preventDefault();
          setSearchTerm(e.target.value);
        }}
      />
      <button onClick={handleSearchClick}></button>
    </div>
  );
}
