/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import MarkdownPreview from "../components/MarkdownPreview";
import DarkMode from "../components/buttons/DarkMode";
import sampleImage from "../public/avatar-male.png";
import Link from "next/link";
import dayjs from "dayjs";
import { GET_FAVICON_FROM_SITE_LINK } from "../components/utils/constants";
import { imageUtil } from "../components/utils/Utils";

function DefaultTheme({ profile }) {
  const { theme } = useTheme();
  return (
    <div className="h-screen mx-2 sm:mx-20 md:mx-56">
      {/* profile on large screen */}
      <div className="hidden lg:block md:block ">
        <ProfileLargePart profile={profile} />
      </div>

      {/*  profile on small screen */}
      <div className="sm:hidden">
        <ProfileSmallPart profile={profile} />
      </div>

      {/* stack part */}
      <div className="p-5 rounded-md my-2 bg-gray-100 dark:bg-[#18181B]">
        {profile?.skills.length > 0 ? (
          <StackPart
            skill={profile?.skills}
            extra_skills={profile?.extra_skills}
          />
        ) : (
          <></>
        )}
      </div>
      {/* about part */}
      <div className=" py-2 rounded-md my-2">
        <AboutPart about={profile?.about_markdown} />
      </div>

      {/* blogs part */}
      {profile?.pinned_blogs.length > 0 ? (
        <div className="my-2">
          <BlogsPart blogs={profile?.pinned_blogs} />
        </div>
      ) : (
        <></>
      )}
      {/* certificates part */}
      {profile?.certifications.length > 0 ? (
        <div className="my-2">
          <CertificationsPart certifications={profile?.certifications} />
        </div>
      ) : (
        <></>
      )}
      {/* projects part */}
      {profile?.projects.length > 0 ? (
        <div className="my-2">
          <ProjectPart projects={profile?.projects} />
        </div>
      ) : (
        <></>
      )}
      {/* experience part */}
      {profile?.experiences.length > 0 ? (
        <div className="my-2">
          <ExperiencePart experience={profile?.experiences} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const ProfileLargePart = ({ profile }) => {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  mt-5  px-5 py-2  dark:border-none">
      <div className="flex flex-col ">
        <div className="grid gap-2">
          <h1 className="text-5xl font-bold"> 👋 Hi, I’m </h1>
          <h1 className="text-5xl font-bold">{profile?.username}.</h1>
          <p className="text-lg">
            An <span className="font-semibold">{profile?.expertise}</span> from{" "}
            <span className="font-semibold "> {profile?.country}</span>.
          </p>
          <p className="text-lg">{profile?.status}</p>
        </div>
        <SocialPart
          social={profile.social}
          theme={theme}
          resume={profile?.resume}
        />
      </div>
      <div className="flex justify-center">
        <ProfileImageCircle image={profile?.profile_img} />
      </div>
    </div>
  );
};

const ProfileSmallPart = ({ profile }) => {
  const { theme } = useTheme();
  return (
    <div className="grid lg:justify-start  lg:w-auto w-full flex-none lg:flex-1 auto-rows-max ">
      {/* image  */}
      <div className="flex justify-center">
        <ProfileImageCircle image={profile?.profile_img} />
      </div>
      {/* profile details */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold"> 👋 Hi, I’m </h1>
        <h1 className="text-3xl font-bold capitalize">{profile?.username}</h1>
        <p className="text-lg">
          An <span className="font-semibold">{profile?.expertise}</span> from{" "}
          <span className="font-semibold "> {profile?.country}</span>.
        </p>
        <p className="text-lg">{profile?.status}</p>
        <SocialPart
          social={profile.social}
          theme={theme}
          resume={profile?.resume}
        />
      </div>
    </div>
  );
};

const ProfileImageCircle = ({ image }) => {
  return (
    <Image
      alt={image}
      className="rounded-full object-cover "
      height={300}
      width={300}
      src={image ? image : sampleImage}
    />
  );
};

const SocialPart = ({ social, theme, resume }) => {
  return (
    <div className="flex flex-wrap gap-2 pt-4">
      {social.map((social, i) => {
        return (
          <div key={i} className=" flex px-3 pt-2  rounded-md">
            <a
              href={
                social.link_placeholder
                  ? social.link_placeholder + social.link
                  : social.link
              }
              target={"_blank"}
              rel="noreferrer"
            >
              <Image
                alt="some"
                src={
                  social?.darkPath
                    ? theme == "dark"
                      ? `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${social.value}-dark.svg`
                      : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${social.value}.svg`
                    : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${social.value}.svg`
                }
                height={20}
                width={20}
              />
            </a>
          </div>
        );
      })}
      {resume.length == 0 ? (
        <></>
      ) : (
        <Link href={resume} passHref>
          <Image
            alt="some"
            src="https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/pdf-svgrepo-com.svg"
            height={20}
            width={20}
          />
        </Link>
      )}
    </div>
  );
};

const StackPart = ({ skill, extra_skills }) => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {skill.map((skills, i) => {
        return (
          <div
            key={i}
            className="sm:px-3 pt-2 dark:bg-slate-900 rounded flex gap-2"
          >
            <Image
              alt={skills?.name}
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skills?.name}/${skills?.name}-${skills?.svg}.svg`}
              height={26}
              width={26}
              layout="fixed"
            />
            <p className="capitalize font-semibold hidden lg:block">
              {skills.name}
            </p>
          </div>
        );
      })}
      {extra_skills.split(",").map((skill, i) => {
        return (
          <div key={i} className="sm:px-3 pt-2 dark:bg-slate-900 rounded flex gap-2 capitalize font-semibold">
            🤹 {skill}
          </div>
        );
      })}
    </div>
  );
};

const AboutPart = ({ about }) => {
  return (
    <div className="flex place-content-center">
      <div className=" prose text-justify max-w-none px-5 dark:prose-invert">
        <MarkdownPreview about={about} />
      </div>
    </div>
  );
};

const ProjectPart = ({ projects }) => {
  const [number, setNumber] = useState(4);
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
        {projects?.slice(0, number).map((p, i) => {
          return (
            <div
              key={i}
              className={`rounded-md bg-gray-100  dark:bg-[#18181B] flex flex-col p-4 justify-between gap-2`}
            >
              <>
                <div className="flex justify-between">
                  <h1 className="text-lg font-bold capitalize hover:underline">
                    <Link
                      href={
                        p?.live_link === ""
                          ? p?.source_code_link === ""
                            ? ""
                            : p?.source_code_link
                          : p?.live_link
                      }
                    >
                      {p.title}
                    </Link>
                  </h1>
                  <Image
                    alt={p.stacks}
                    src={`https://raw.githubusercontent.com/shashi2602/devicon/master/icons/${p.stacks.toLowerCase()}/${p.stacks.toLowerCase()}-original.svg`}
                    height={20}
                    width={20}
                    layout="fixed"
                  />
                </div>

                <p>{p.short_info}</p>
              </>
              <div className="flex justify-around gap-2  pt-2">
                <Link href={p.source_code_link} passHref>
                  <a className="px-4 py-1 rounded-md bg-gray-200 dark:bg-[#141416] font-semibold">
                    source
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-2">
        {projects.length === 4 ? (
          <></>
        ) : number == projects?.length ? (
          <div
            className="  px-2 font-semibold"
            onClick={() => {
              setNumber(4);
            }}
          >
            Show Less <i className="fa fa-angle-up" aria-hidden="true"></i>
          </div>
        ) : (
          <div
            className="  px-2 font-semibold"
            onClick={() => {
              setNumber(projects?.length);
            }}
          >
            Show More <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        )}
      </div>
    </>
  );
};

const BlogsPart = ({ blogs }) => {
  const [number, setNumber] = useState(3);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5 ">
        {blogs?.slice(0, number).map((blog, i) => {
          return (
            <div className="flex flex-col" key={i}>
              <div
                className="h-[13rem] w-full relative block overflow-hidden bg-center bg-no-repeat bg-cover rounded-md "
                style={{
                  backgroundImage: `url(${blog.image})`,
                }}
              >
                <Link href={blog.url} passHref>
                  <div className="flex flex-col h-full justify-end relative p-4 text-white bg-black bg-opacity-50 cursor-pointer">
                    <h1 className="text-lg font-bold">{blog.title}</h1>
                    <p className="text-sm font-bold capitalize">
                      {blog.published_on}
                    </p>
                    <p>{dayjs(blog.published_at).format("MMM YYYY")}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-2">
        {blogs.length === 3 ? (
          <></>
        ) : number == blogs?.length ? (
          <div
            className="font-semibold"
            onClick={() => {
              setNumber(3);
            }}
          >
            Show Less <i className="fa fa-angle-up" aria-hidden="true"></i>
          </div>
        ) : (
          <div
            className="font-semibold"
            onClick={() => {
              setNumber(blogs?.length);
            }}
          >
            Show More <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        )}
      </div>
    </div>
  );
};

const CertificationsPart = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 ">
      {certifications?.map((certi, i) => {
        return (
          <div
            key={i}
            className={`rounded-md  dark:border-0 w-full dark:bg-[#18181B]  grid grid-flow-col p-2 justify-between gap-2`}
          >
            <div className="flex justify-between">
              <img
                alt={certi.certi_title}
                src={GET_FAVICON_FROM_SITE_LINK + imageUtil(certi.certi_link)}
                className="w-[3rem] h-[3rem] rounded-md m-2"
              />
              <div className=" p-2">
                <a href={certi.certi_link}>
                  <p className="font-semibold "> 🏅 {certi.certi_title}</p>
                </a>
                <p>
                  {certi.certi_issued_by}{" "}
                  <span className="text-sm text-gray-500 ">
                    on{" "}
                    {certi.certi_issued
                      ? dayjs(certi.certi_issued).format("MMM YYYY")
                      : "No issue date"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ExperiencePart = ({ experience }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      {experience.map((e, i) => {
        return (
          <div
            key={i}
            className="flex flex-col border-2 rounded dark:border-[#18181B]   p-4"
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div>
                  {e?.company_link ? (
                    <Image
                      alt={e.company_name}
                      src={
                        GET_FAVICON_FROM_SITE_LINK + imageUtil(e.company_link)
                      }
                      height={26}
                      width={26}
                      layout={"fixed"}
                    />
                  ) : (
                    <i className="fa fa-building" aria-hidden="true"></i>
                  )}
                </div>
                <div>
                  <h1 className="capitalize">
                    {e?.title}{" "}
                    <a
                      href={e?.company_link}
                      className=" font-bold  hover:underline"
                    >
                      @{e?.company_name}
                    </a>
                  </h1>
                  <p className="  text-gray-500 ">
                    {dayjs("2021-08-08").format("MMM YYYY")} {" - "}
                    {e.end_date
                      ? dayjs(e.end_date).format("MMM YYYY")
                      : "present"}{" "}
                  </p>
                </div>
              </div>
              <div>
                {expand ? (
                  <i
                    className="fa fa-angle-up text-2xl"
                    aria-hidden="true"
                    onClick={() => setExpand(!expand)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-angle-down text-2xl"
                    aria-hidden="true"
                    onClick={() => setExpand(!expand)}
                  ></i>
                )}
              </div>
            </div>
            {expand ? (
              <div className="prose text-justify dark:prose-invert max-w-max">
                <MarkdownPreview about={e.description} />
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default DefaultTheme;
