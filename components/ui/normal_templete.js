/* eslint-disable react/jsx-no-target-blank */
import Image from "next/image";
import React from "react";
import { firstLetterUpper } from "../utiles/textutils";
import md from "markdown-it";
import Link from "next/link";
import DarkMode from "./DarkMode";

function NormalTemplete({ profile }) {
  return (
    <div className=" sm:px-7 lg:px-72 md:7 2xl:7 px-7 pt-5 ">
      <div className="flex flex-wrap lg:flex-none gap-4">
        <div className="grid place-content-center  lg:justify-start  lg:w-auto w-full flex-none lg:flex-1 auto-rows-max ">
          {/* image  */}
          <div className="flex justify-center pt-3">
            <Image
              alt={profile?.username}
              className="rounded-full   object-cover  "
              height={300}
              width={300}
              src={profile?.profile_img ? profile?.profile_img : sampleimg}
            />
          </div>
          {/* profile details */}
          <div className="dark:text-white">
            <h1 align="center" className="text-3xl font-bold p-3 ">
              {firstLetterUpper(profile?.username)}
            </h1>
            <h3 align="center">{profile?.status}</h3>
            <div className="flex justify-center gap-5 pt-2 ">
              <p className="font-bold">
                <i className="fa fa-institution text-purple-800 pr-1"></i>
                {profile?.expertise}
              </p>
              <p className="font-bold">
                <i className="fa fa-map-marker text-sky-700 pr-1"></i>
                {profile?.country}
              </p>
            </div>
          </div>
          {/* social accounts */}
          <div className="flex flex-wrap gap-2 justify-center pt-4">
            {profile.social.map((social) => {
              return (
                <div
                  key={social.id}
                  className="bg-gray-300  dark:bg-gray-700 flex px-3 pt-2 rounded"
                >
                  <a
                    href={
                      social.link_placeholder
                        ? social.link_placeholder + social.link
                        : social.link
                    }
                    target={"_blank"}
                  >
                    <Image
                      alt="some"
                      src={social.icon}
                      height={20}
                      width={20}
                    />
                  </a>
                </div>
              );
            })}
          </div>
          {/* stacks */}
          <div className="flex flex-wrap gap-2  justify-center pt-4">
            {profile.skills.map((skills, i) => {
              return (
                <div
                  key={i}
                  className="px-3 pt-2 hover:bg-gray-200 dark:bg-gray-700 rounded"
                >
                  <Image
                    alt={skills?.name}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skills?.name}/${skills?.name}-${skills?.svg}.svg`}
                    height={20}
                    width={20}
                    layout="fixed"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* right side */}
        <div className="py-4 lg:py-8 flex-1">
          <h1 className="text-xl font-semibold ">About</h1>
          <div
            className="prose text-justify max-w-none py-2 prose-strong:underline dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: md().render(profile.about_markdown),
            }}
          ></div>
          <hr />
          <div className="grid pt-2">
            <h1 className="text-xl font-semibold py-2">Projects</h1>
            {profile.projects.map((project, i) => {
              return (
                <div key={project.id} className="p-2">
                  <div className="flex">
                    <p className="text-5xl p-4 font-bold text-gray-400">{i}</p>
                    <div className="flex-auto">
                      <div className="flex justify-between">
                        <h5 className="font-semibold text-lg">
                          <Link href={project.live_link} passHref>
                            <a target={"_blank"}>
                              {firstLetterUpper(project.title)}
                            </a>
                          </Link>
                        </h5>
                        <div>
                          <Link href={project?.source_code_link} passHref>
                            <a target={"_blank"}>
                              <i className="fa fa-github text-sm "></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                      <p className="text-justify py-1">{project.short_info}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalTemplete;
