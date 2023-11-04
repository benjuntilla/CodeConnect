import { UUID } from "crypto";

export type User = {
  id: UUID;
  name: string;
  skills: string;
  university: string;
  description: string;
  metadata: JSON;
};

export type Project = {
  id: UUID;
  name: string;
  description: string;
  skills_required: string;
  created_user: UUID;
  metadata: JSON;
};

export type Notification = {
  id: UUID;
  user_uuid: UUID;
  project_uuid: UUID;
};
