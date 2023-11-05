"use client";

import React, { useState } from "react";
import { createProject } from "@/lib/api/project";
import { useUserContext } from "./UserProvider";
import { getUserUID } from "@/lib/firebase";

export default function CreateProj() {
  const context = useUserContext();
  const { user } = useUserContext();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    skills_required: "",
    metadata: {}, // Initialize metadata as an empty object or with specific properties if needed
    project_img: "", // You might want to handle image uploads separately
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("You must be logged in to create a project.");
      return;
    }
    try {
      const newProject = {
        ...projectData,
        created_user: getUserUID(context.app), // Assuming 'user' object has an 'id' field
      };
      const result = await createProject(context.client, context.project);
      console.log("Project created:", result);
      // Handle what to do after the project is created successfully (e.g., redirecting to the project page)
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Create Project</button>
<dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <h3 className="font-bold text-lg">Create your Project!</h3>
    <p className="py-4">Press ESC key or click the button above to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}

              <div>
                <label htmlFor="name">Project Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={projectData.name}
                  onChange={handleChange}
                  required
                  placeholder="Type here"
                  className="input w-full max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={projectData.description}
                  onChange={handleChange}
                  required
                  placeholder="Project Description"
                  className="input w-full max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="skills_required">Skills Required:</label>
                <input
                  id="skills_required"
                  name="skills_required"
                  type="text"
                  value={projectData.skills_required}
                  onChange={handleChange}
                  required
                  placeholder="Skills Required"
                  className="input w-full max-w-xs"
                />
              </div>
              <div>
                <label htmlFor="project_img">Project Image URL:</label>
                <input
                  id="project_img"
                  name="project_img"
                  type="text"
                  value={projectData.project_img}
                  onChange={handleChange}
                  required
                  placeholder="Image URL"
                  className="input w-full max-w-xsk"
                />
              </div>
              <div>
                <button
                type="submit" style={{ border: '1px solid #ccc', padding: '10px 20px', cursor: 'pointer' }}>
                  Create Project
                </button>
              </div>
      </form>
    </div>
  </div>
</dialog>



   </>
  );
}
