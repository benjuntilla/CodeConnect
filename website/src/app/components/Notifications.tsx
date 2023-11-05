// NotificationDrawer.js
import { getUser } from "@/lib/api/user";
import { Notification } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { useUserContext } from "./UserProvider";
import { getProject } from "@/lib/api/project";
import {
  acceptRequest,
  deleteNotification,
  getNotifications,
  rejectRequest,
} from "@/lib/api/notification";

const NotificationDrawer = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const context = useUserContext();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const rejectNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    rejectRequest(context.client, id);
  };

  const acceptNotification = (
    user_id: string,
    project_id: string,
    notification_id: string
  ) => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== notification_id
      )
    );
    acceptRequest(context.client, user_id, project_id, notification_id);
  };

  const getRequestingUser = async (user_id: string) => {
    let user = await getUser(context.client, user_id);
    return user;
  };

  const getUserProject = async (project_id: string) => {
    let project = await getProject(context.client, project_id);
    return project;
  };

  const getUserNotifications = async (user_id: string) => {
    let notifications = await getNotifications(context.client, user_id);
    setNotifications(notifications.data);
  };

  useEffect(() => {
    getUserNotifications(context.user?.uid ?? "");
  }, []);
  return (
    <div className="relative">
      <button
        className="p-2 bg-blue-500 text-white rounded-full shadow-md fixed bottom-4 right-4"
        onClick={toggleDrawer}
      >
        Notifications ({notifications.length})
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-64 bg-white border rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-2 p-2 border rounded bg-blue-100"
            >
              {getRequestingUser(notification.user_uuid).then(
                (data) => data.data[0].name
              )}{" "}
              wants to join your project{" "}
              {getUserProject(notification.project_uuid).then(
                (data) => data.data[0].name
              )}
              <button
                className="ml-2 text-red-500 hover:underline"
                onClick={() => rejectNotification(notification.id!)}
              >
                Close
              </button>
              <button
                className="ml-2 text-green-500 hover:underline"
                onClick={() =>
                  acceptNotification(
                    notification.user_uuid,
                    notification.project_uuid,
                    notification.id!
                  )
                }
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDrawer;
