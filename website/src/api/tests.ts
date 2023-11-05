import { Project, User } from "./types";
import { createUser, searchUsers } from "./user";
import { createApolloClient } from "./apollo";
import { createProject, recommendProjects, searchProjects } from "./project";
import { uploadProfilePfp } from "./image";
import { randomUUID } from "crypto";
import fs from "fs";

const user1 = randomUUID();
const user2 = randomUUID();
const user3 = randomUUID();
const users: User[] = [
  {
    id: "890b5b29-8303-4229-8e01-dbe2f7e20343",
    name: "John Doe",
    skills: "Programming, Web Design, Statistics",
    university: "XYZ University",
    description: "I am a software developer.",
    metadata: { age: 30, location: "New York" },
  },
  {
    id: user2,
    name: "Alice Smith",
    skills: "Data Analysis, Statistics",
    university: "ABC University",
    description: "I am a data scientist.",
    metadata: { age: 28, location: "San Francisco" },
  },
  {
    id: user3,
    name: "Bob Johnson",
    skills: "Graphic Design, Illustration, Data Analysis",
    university: "PQR University",
    description: "I am a graphic designer.",
    metadata: { age: 25, location: "Los Angeles" },
  },
];

const projects: Project[] = [
  {
    id: randomUUID(),
    name: "Website Development",
    description: "Create a modern website for a client.",
    skills_required: "Programming, Web Design",
    created_user: user1,
    metadata: { deadline: "2023-12-31", budget: 5000 },
  },
  {
    id: randomUUID(),
    name: "Data Analysis Project",
    description: "Analyze a large dataset for insights.",
    skills_required: "Data Analysis, Statistics",
    created_user: user2,
    metadata: { data_source: "CSV file", duration: "2 months" },
  },
  {
    id: randomUUID(),
    name: "Graphic Design Commission",
    description: "Create illustrations for a children's book.",
    skills_required: "Graphic Design, Illustration",
    created_user: user3,
    metadata: { author: "Jane Smith", pages: 30 },
  },
];
const admin = createApolloClient();

async function initializeWithDummyData() {
  for (const user of users) {
    try {
      await createUser(admin, user);
    } catch (e) {
      console.log(e);
    }
  }

  for (const project of projects) {
    try {
      await createProject(admin, project);
    } catch (e) {
      console.log(e);
    }
  }
}

async function recommendProjectsForUser(user: User) {
  let projects = await searchUsers(admin, "John", "", 1, 3);
  console.log(projects.data);
}

async function searchForProjects() {
  let projects = await searchProjects(admin, "Website", "", 1, 3);
  console.log(projects.data);
}

async function searchForUsers() {
  let users = await searchUsers(admin, "John", "", 1, 3);
  console.log(users.data);
}

async function uploadPfp() {
  let file = fs.readFileSync(
    "/Users/denssumesh/Documents/GitHub/CodeCupid/website/src/api/google.txt"
  );
  console.log(
    await uploadProfilePfp("890b5b29-8303-4229-8e01-dbe2f7e20343", file)
  );
}

// Promise.resolve(initializeWithDummyData());
// Promise.resolve(recommendProjectsForUser(users[0]));
// Promise.resolve(searchForProjects());
// Promise.resolve(searchForUsers());
Promise.resolve(uploadPfp());
