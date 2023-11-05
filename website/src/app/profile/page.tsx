import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { AiFillGithub } from "react-icons/ai";
export default function Profile() {
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
                src="/next.svg"
                width="100"
                height="100"
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
              color: "black",
            }}
          >
            Profile
            <p style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
              <AiFillGithub className="mx-3" size="2em" />
              <a href="#">Your Link</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-grow">
          <div className="flex-grow card bg-base-300 rounded-box p-4 m-2">
            <div className="mb-2">My projects:</div>
            <div className="form-control">
              <label className="swap swap-flip text-9xl">
                <input type="checkbox" />
                <div className="swap-on">
                  <label className="label">
                    <span className="label-text">Return</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                  />
                </div>
                <div className="swap-off">+</div>
              </label>
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="flex-grow card bg-base-300 rounded-box p-4 m-2">
            <div className="mb-2">
              Projects I have collaborated on:
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Done?</th>
                      <th>Name</th>
                      <th>Job</th>
                      <th></th>
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
                                src="/Guy.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">
                              United States
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
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
                                src="/tailwind-css-component-profile-3@56w.png"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Brice Swyre</div>
                            <div className="text-sm opacity-50">China</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Carroll Group
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Tax Accountant
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
                                src="/tailwind-css-component-profile-4@56w.png"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Marjy Ferencz</div>
                            <div className="text-sm opacity-50">Russia</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Rowe-Schoen
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Office Assistant I
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
                                src="/tailwind-css-component-profile-5@56w.png"
                                width="100"
                                height="100"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Yancy Tear</div>
                            <div className="text-sm opacity-50">Brazil</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Wyman-Ledner
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Community Outreach Specialist
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
