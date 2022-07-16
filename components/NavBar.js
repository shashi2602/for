/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import LoginModal from "./modals/LoginModal";
import { useSimplyContext } from "../context/SimplyContext";
import { useRouter } from "next/router";
import Image from "next/image";
import PublishButton from "./buttons/PublishButton";
import DarkMode from "./buttons/DarkMode";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { signOut, user, currentUser } = useSimplyContext();
  const history = useRouter();
  return (
    <Disclosure as="nav" className="dark:bg-[#18181B] bg-gray-100">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex  items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="block lg:hidden ">
                    <Link href="/" passHref={true}>
                      <span className="text-3xl font-bold ">... ..-.</span>
                    </Link>
                  </div>
                  <Link href="/" passHref={true}>
                    <div className="hidden lg:block h-8 w-auto dark:text-white text-2xl cursor-pointer">
                      <span className="font-bold">
                        ... ..-.
                        <span className=" font-bold">{"DEV"}</span>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              {user ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div className="flex gap-3">
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <Image
                          className="rounded-full"
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt={user?.displayName}
                          height={40}
                          width={40}
                        />
                      </Menu.Button>
                      {history.pathname == "/" ? (
                        <></>
                      ) : (
                        <div className="hidden lg:block">
                          <PublishButton />
                        </div>
                      )}
                      <DarkMode />
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#18181B]  ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span>
                              <Link href="/">
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-white hover:text-gray-700 font-semibold capitalize"
                                  )}
                                >
                                  {user.displayName}
                                </a>
                              </Link>
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span>
                              <Link href="/dashboard">
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-white hover:text-gray-700"
                                  )}
                                >
                                  Dashboard
                                </a>
                              </Link>
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span>
                              <Link href={`/${currentUser.site_username}`}>
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-white hover:text-gray-700"
                                  )}
                                >
                                  Go live
                                </a>
                              </Link>
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={() => {
                                signOut();
                                localStorage.removeItem("userDoc");
                                localStorage.removeItem("current_user");
                                history.push("/");
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block  px-4 py-2 text-sm  text-white hover:text-gray-700"
                              )}
                            >
                              Sign out
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex">
                  <LoginModal />
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
