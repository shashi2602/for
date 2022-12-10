/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, Fragment, useCallback } from "react";
import GithubBtn from "../components/buttons/GithubButton";
import GoogleBtn from "../components/buttons/GoogleButton";
import { Transition } from "@headlessui/react";
import { useSimplyContext } from "../context/SimplyContext";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Head from "next/head";
import Joi from "joi";
import { useRouter } from "next/router";

function HomePage() {
  const [username, setUsername] = useState("");
  const [hide, sethide] = useState(true);
  const [userNameAvailable, setUserNameAvailable] = useState(true);
  const { user, userNamesList } = useSimplyContext();
  const [error, setError] = useState();
  const schema = Joi.string().max(15).min(2).alphanum();
  const checkUserNameAvailability = useCallback(
    (un) => {
      const result = schema.validate(un);
      setError(result?.error?.message.replaceAll('"', " "));
      if (userNamesList.some((u) => u.site_username === un)) {
        setUserNameAvailable(false);
      } else {
        setUserNameAvailable(true);
      }
    },
    [username]
  );

  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    checkUserNameAvailability(e.target.value);
  };

  const router = useRouter();
  console.log("▙▟  █〓 ██ ▙▟ ▛▟ ◗  ▛▚▞▜ █☰ ");
  return (
    <>
      <div
        className=" h-screen"
        style={{ backgroundImage: `url(/footer.png)`, backgroundSize: "cover" }}
      >
        <Head>
          <title>For-devs</title>
        </Head>
        <NavBar />
        <div className="max-w-6xl mx-auto px-4  sm:px-6">
          <div className="pt-32 pb-12 md:pt-35 md:pb-10">
            {hide ? (
              <div className="text-center pb-12 md:pb-16">
                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl  dark:text-white  font-extrabold leading-tighter tracking-tighter mb-4"
                  data-aos="zoom-y-out"
                >
                  Make your Portfolio website easy with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500">
                    simplyfor
                  </span>
                </h1>
                <div className="max-w-3xl mx-auto">
                  <p
                    className="text-xl dark:text-white mb-8"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Let's make it simple
                  </p>
                  <div
                    className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="300"
                  >
                    <div>
                      {user ? (
                        <Link href="/dashboard" passHref={true}>
                          <a className="btn text-black dark:text-white w-full font-semibold  p-3 border-shadow dark:bg-black/40  mb-4 sm:w-auto sm:mb-0">
                            Goto Dashboard
                          </a>
                        </Link>
                      ) : (
                        <button
                          className="btn text-black dark:text-white w-full font-semibold p-3  border-shadow dark:bg-black/40   mb-4 sm:w-auto sm:mb-0"
                          onClick={() => sethide(false)}
                        >
                          GetStarted
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Transition appear show={!hide}>
                <Transition.Child
                  as={Fragment}
                  enter="transform transition duration-[400ms]"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="text-center pb-12 md:pb-16">
                    <h1
                      className="text-5xl md:text-6xl dark:text-white  font-extrabold leading-tighter  tracking-tighter mb-4 "
                      data-aos="zoom-y-out"
                    >
                      Pick your name for the <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                        simplyfor.dev/
                        <span className="dark:text-white">
                          {username.replaceAll(" ", "_")}
                        </span>
                      </span>
                    </h1>
                    <div className="py-3">
                      <input
                        type="text"
                        name="username"
                        className="appearance-none font-semibold  dark:text-white dark:bg-[#18181B]  bg-gray-100 w-full py-4 px-3 text-grey-darker mb-2 rounded-md focus:outline-none"
                        placeholder="simply select your username"
                        style={{ width: "60%" }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <p className="text-red-600 font-semibold">
                        {username && error && "☠️" + error}
                      </p>
                      {!userNameAvailable ? (
                        <p className="text-red-700 font-semibold ">
                          😢 Sorry Simplyfor is not available{" "}
                        </p>
                      ) : username.length === 0 ? (
                        <></>
                      ) : (
                        !error && (
                          <div>
                            <p className="text-green-600  font-semibold">
                              😍 Your Simplyfor is available{" "}
                            </p>
                            <div className="flex justify-center gap-2 mt-3">
                              <GoogleBtn
                                username={username.replaceAll(" ", "_")}
                              />
                              <GithubBtn
                                username={username.replaceAll(" ", "_")}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Transition.Child>
              </Transition>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
