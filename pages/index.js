import React, { useEffect, useState, Fragment } from "react";
import GithubBtn from "../components/buttons/github_btn";
import GoogleBtn from "../components/buttons/google_btn";
import { Transition } from "@headlessui/react";
import { useSimplyContext } from "../context/SimplyContext";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Head from "next/head";
import footerImage from "../public/footer.png"
import Image from "next/image";

function HomePage() {
  const [username, setUsername] = useState("");
  const [hide, sethide] = useState(true);
  const [userNameAvailable, setUserNameAvailable] = useState(true);
  const { user, userNamesList } = useSimplyContext();

  useEffect(() => {
    const checkUserNameAvailability = () => {
      if (userNamesList.some((u) => u.site_username === username)) {
        setUserNameAvailable(false);
      } else {
        setUserNameAvailable(true);
      }
    };
    checkUserNameAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <>
    <div className="dark:bg-gray-800 h-screen" style={{backgroundImage:`url(/footer.png)`,backgroundSize:"cover"}}>
      <Head>
        <title>For-devs</title>
      </Head>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4  sm:px-6">
        <div className="pt-32 pb-12 md:pt-35 md:pb-10">
          {hide ? (
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl md:text-6xl dark:text-white  font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Make your Portfolio website easy with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500">
                  For -.. . ...-
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl dark:text-white mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Our site makes you a portfolio site in seconds.
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div>
                    {user ? (
                      <Link href="/dashboard">
                        <a className="btn  text-black   bg-yellow-400 p-3 rounded-lg  w-full mb-4 sm:w-auto sm:mb-0">
                          Goto Dashboard
                        </a>
                      </Link>
                    ) : (
                      <button
                        className="btn text-black  bg-yellow-400 p-3 rounded-lg  w-full mb-4 sm:w-auto sm:mb-0"
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
                     For.-.. . ...-/
                      <span className="dark:text-white">@{username}</span>
                    </span>
                  </h1>
                  <div className="py-3">
                    <input
                      id="password"
                      type="text"
                      className="appearance-none bg-gray-100 rounded w-full py-4 px-3 text-grey-darker mb-3 border-2 border-yellow-500"
                      placeholder="Simplyfolio.dev/@"
                      style={{ width: "60%" }}
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    {!userNameAvailable ? (
                      <p className="text-red-700 font-semibold ">
                       😢 Sorry Simplyfolio is not available{" "}
                      </p>
                    ) : username.length === 0 ? (
                      <></>
                    ) : (
                      <div>
                        <p className="text-green-600  font-semibold">
                        😍 Your Simplyfolio is available {" "}
                        </p>
                        <div className="flex justify-center gap-2 mt-3">
                          <GoogleBtn username={username} />
                          <GithubBtn username={username} />
                        </div>
                      </div>
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
