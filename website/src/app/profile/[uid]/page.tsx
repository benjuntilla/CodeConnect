"use client";

import { AiFillGithub } from "react-icons/ai";
import CreateProj from "../../components/CreateProj";
import Image from "next/image";
import { useUserContext } from "../../components/UserProvider";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/api/user";
import type { User } from "@/lib/types";

export default function Profile({ params }: { params: { uid: string } }) {
  const context = useUserContext();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(context.client, params.uid).then((res) => {
      let users = res.data.users_by_pk;
      if (users === null || users.length === 0) {
        console.log("No users found");
      } else {
        console.log(users);
        setUser(users[0]);
      }
    });
  }, [context.client, params.uid]);

  return (
    <>
      <div
        className="text-2xl grid grid-rows-1 w-full h-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <div className="avatar">
            <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-30 h-30">
              <Image
                src={user?.profile_pfp || "/CodeCupid-.png"}
                width="150"
                height="150"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div
            className="place-content-evenly px-10"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "1rem",
              color: "white",
            }}
          >
            {user ? user.name : "User"}
            <p
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <AiFillGithub className="mx-3" size="2em" />
              <a href="#">Your Link</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-grow">
          <div className="flex-grow card bg-base-300 rounded-box p-4 m-2">
            <div className="mb-2">Projects Owned</div>
            <CreateProj />
          </div>
          <div className="flex-grow card bg-base-300 rounded-box p-4 m-2">
            <div className="mb-2 ">
              Projects Collaborating On
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Done?</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                width="300"
                                height="300"
                                src="/vercel.svg"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Video Game Project</div>
                            <div className="text-sm opacity-50">
                              Author: Rajiv Menon
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className="link link-success">
                          https://github.com/CodeMasterX99/ultimate-project
                        </a>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Needs Help With Code
                        </span>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src="/vercel.svg"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Website Design</div>
                            <div className="text-sm opacity-50">
                              Author: Brice Swyre
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className="link link-info">
                          https://github.com/WebDevJourney/peak-performance-site
                        </a>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Help with Errors
                        </span>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src="/vercel.svg"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              Arduino Watch Project
                            </div>
                            <div className="text-sm opacity-50">
                              Author: Marjy Ferencz
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className="link link-error">
                          https://github.com/TinkerTech/arduino-smartwatch
                        </a>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Assist with code
                        </span>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                    {/* row 4 */}
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src="/vercel.svg"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Personal Website</div>
                            <div className="text-sm opacity-50">
                              Author: Yancy Tear
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className="link link-success">
                          https://github.com/CreativeSoul/personal-website-portfolio
                        </a>
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Code Help
                        </span>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </th>
                    </tr>
                  </tbody>
                  {/* foot */}
                  <tfoot>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
