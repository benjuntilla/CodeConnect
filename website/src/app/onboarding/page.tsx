"use client";

import { createApolloClient } from "@/lib/apollo";
import { getUserUID } from "@/lib/firebase";
import { createUser } from "@/lib/api/user";
import { useState } from "react";
import { useUserContext } from "../components/UserProvider";

export default function Onboarding() {
  const context = useUserContext();
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [skills, setSkills] = useState("");
  let [githubURL, setGithubURL] = useState("");
  let [university, setUniversity] = useState("");

  return (
    <div className="flex flex-col">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">User description</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Description"
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Skills</span>
          <span className="label-text-alt">Separate with commas!</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            e.preventDefault();
            setSkills(e.target.value);
          }}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Github URL (optional)</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            e.preventDefault();
            setGithubURL(e.target.value);
          }}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">University (optional)</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            e.preventDefault();
            setUniversity(e.target.value);
          }}
        />
      </div>
      <div>
        <div className="profile_pfp"></div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Profile picture upload (optional)</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          let uid = getUserUID(context.app);
          console.log(uid);
          if (uid === null) throw new Error("User not logged in");
          let client = createApolloClient();
          createUser(client, {
            name: name,
            id: uid,
            description: description,
            skills: skills,
            metadata: { github_url: githubURL },
            university: university,
            profile_pfp: "test",
          });
          // window.location.href = "/";
        }}
      >
        Create account
      </button>
    </div>
  );
}
