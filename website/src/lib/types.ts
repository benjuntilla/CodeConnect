import { UUID } from "crypto";

export type User = {
  id: string;
  name: string;
  skills: string;
  university?: string;
  description?: string;
  metadata?: Record<string, any>;
  profile_pfp?: string;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  skills_required: string;
  created_user: string;
  metadata: Record<string, any>;
  project_img?: string;
};

export type Notification = {
  id?: string;
  user_uuid: string;
  project_uuid: string;
};
