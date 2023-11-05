import { ApolloClient, ApolloQueryResult, gql } from "@apollo/client";
import { Notification } from "./types";
import { UUID } from "crypto";
import { func } from "prop-types";

export function createNotifcation(
  client: ApolloClient<any>,
  notification: Notification
) {
  const mutation = gql`
    mutation CreateNotification($user_uuid: String!, $project_uuid: uuid!) {
      insert_notifications_one(
        object: { user_uuid: $user_uuid, project_uuid: $project_uuid }
      ) {
        id
        user_uuid
        project_uuid
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      user_id: notification.user_uuid,
      project_id: notification.project_uuid,
    },
  });
}

export function getNotifications(client: ApolloClient<any>, user_id: string) {
  const query = gql`
    query GetNotification($user_id: String!) {
      users_by_pk(id: $user_id) {
        notifications {
          id
          project_uuid
          user_uuid
        }
      }
    }
  `;

  return client.query({
    query,
    variables: {
      user_id,
    },
  });
}

export function deleteNotification(client: ApolloClient<any>, id: UUID) {
  const mutation = gql`
    mutation DeleteNotification($id: uuid!) {
      delete_notifications_by_pk(id: $id) {
        id
      }
    }
  `;

  return client.mutate({
    mutation,
    variables: {
      id,
    },
  });
}

export function acceptRequest(
  client: ApolloClient<any>,
  user_id: UUID,
  project_id: UUID,
  notification_id: UUID
) {
  const mutation = gql`
    mutation AcceptRequest(
      $user_id: String!
      $project_id: uuid!
      $notification_id: uuid!
    ) {
      delete_notifications_by_pk(id: $notification_id) {
        id
      }
      insert_project_assignments_one(
        object: { user_uuid: $user_id, project_uuid: $project_id }
      ) {
        user_uuid
        project_uuid
      }
    }
  `;
  return client.mutate({
    mutation,
    variables: {
      user_id,
      project_id,
      notification_id,
    },
  });
}

export function rejectRequest(
  client: ApolloClient<any>,
  notification_id: UUID
) {
  const mutation = gql`
    mutation RejectRequest($notification_id: uuid!) {
      delete_notifications_by_pk(id: $notification_id) {
        id
      }
    }
  `;
  return client.mutate({
    mutation,
    variables: {
      notification_id,
    },
  });
}
