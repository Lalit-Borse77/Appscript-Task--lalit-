import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("copy to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(text);
  };

  const ShowPassword = () => {
    passwordRef.current.type = "text";

    console.log(ref.current.src);
    if (ref.current.src.includes("hide_eye.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "hide_eye.png";
    }
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.site.length > 3 && form.site.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: "Bounce",
      });
    } else {
      toast("Error :- Password not saved!", {});
    }
  };

  const deletePassword = (id) => {
    console.log("deleting password with id", id);
    let c = confirm("you you really want to delete this password ?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
    // console.log([...passwordArray, form])
  };

  const editPassword = (id) => {
    console.log("editing password with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);

    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 p-3 md:p-0 md:mycontainer min-h-[87.7vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website Url"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer "
                onClick={ShowPassword}
              >
                <img ref={ref} className="w-7 p-1" src="/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex  justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit hover:border border-green-900 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
            Save password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex justify-center text-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              className="mx-2 cursor-pointer w-5 copy"
                              src="copy-icon.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <div className="flex justify-center text-center">
                          <span>{item.username}</span>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              className="mx-2 cursor-pointer w-5 copy"
                              src="copy-icon.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex justify-center text-center">
                          <span>{item.password}</span>
                          <div
                            className="size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              className="mx-2 cursor-pointer w-5 copy"
                              src="copy-icon.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <td className="flex justify-center py-2 border border-white text-center">
                        <span
                          className="mx-2 cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <img className="w-7" src="edit.svg" alt="" />
                        </span>
                        <span
                          className="mx-2 cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <img className="w-7" src="delete.svg" alt="" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
