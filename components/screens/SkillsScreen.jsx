/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useSimplyContext } from "../../context/SimplyContext";
import useSWR from "swr";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Image from "next/image";

function ChooseMeSkills() {
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();
  const { data } = useFetch(
    "https://raw.githubusercontent.com/shashi2602/devicon/master/devicon.json"
  );
  const [languages, setLanguages] = useState();
  useEffect(() => {
    const languagesWithId = data?.map((d, i) => {
      return { ...d, id: i };
    });
    setLanguages(languagesWithId);
  }, [data]);

  const handleRemoveStackFromList = (item) => {
    setCurrentUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((items) => items.name != item.name),
    }));

    setChangeDone(true);
  };
  const handleOnSelect = (item) => {
    if (currentUser.skills.some((i) => i.name == item.name)) {
      handleRemoveStackFromList(item);
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        skills: [
          ...prev.skills,
          {
            name: item.name,
            color: item.color,
            svg: item.versions.svg[0],
          },
        ],
      }));
    }
    setChangeDone(true);
  };

  const formatResult = (item) => {
    return (
      <div className="p-1" key={item.name + Math.floor(Math.random() * 100)}>
        <i
          className={`devicon-${item.name}-${item.versions.font[0]} colored px-1`}
        ></i>{" "}
        <span className="font-medium capitalize">{item.name}</span>
      </div>
    );
  };
  return (
    <div>
      <div className=" w-full  rounded ">
        {currentUser?.skills?.length != 0 ? (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {currentUser?.skills?.map((item, i) => {
              return (
                <StackChip
                  key={i}
                  stack={item}
                  onDeleteClick={handleRemoveStackFromList}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center py-4 font-semibold">
            Search the stack you love
          </p>
        )}
        <div className="  dark:bg-[#18181B] p-4 mt-4 bg-gray-100  border-black rounded-md ">
          <h2 className="font-semibold text-lg px-1">🧠Search stacks</h2>
          <div className="mt-4">
            <ReactSearchAutocomplete
              items={languages}
              onSelect={handleOnSelect}
              showIcon={false}
              showClear={true}
              inputDebounce={700}
              formatResult={formatResult}
              placeholder="search here.."
              // autoFocus
              styling={{
                borderRadius: "5px",
                border: "2px solid black",
                boxShadow: "0px",
              }}
            ></ReactSearchAutocomplete>
          </div>
        </div>
      </div>
      <div className="mt-5">
      {currentUser?.extra_skills?.length != 0 ? (
          <div className="flex gap-2 ">
            {currentUser?.extra_skills?.split(",").map((item, i) => {
              return (
                <div key={i} className="p-2 flex gap-2  dark:bg-[#18181B] bg-gray-100 rounded-md capitalize font-semibold">
                  <snap className="text-lg">🤹</snap> {item}
                </div>
              )
            })}
          </div>
        ):<></>}
      </div>
      <div className=" dark:bg-[#18181B] p-4 mt-4 bg-gray-100  border-black rounded-md">
        <h2 className="font-semibold text-lg px-1 mb-2">Skills</h2>
        <textarea
          className="w-full mt-4 border-2 border-black dark:border-0 p-4 rounded "
          placeholder="Desing, Frontend, Backend, etc"
          onChange={(e) => {
            setCurrentUser((prev) => ({
              ...prev,
              extra_skills: e.target.value,
            }));
            setChangeDone(true);
          }}
          value={currentUser?.extra_skills}
        />
      </div>
    </div>
  );
}

function StackChip({ stack, onDeleteClick }) {
  return (
    <div className=" p-2 flex gap-2  dark:bg-[#18181B] bg-gray-100 rounded-md ">
      <Image
        alt={stack?.name}
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${stack?.name}/${stack?.name}-${stack?.svg}.svg`}
        height={20}
        width={20}
      />
      <p className=" font-semibold text-sm capitalize">{stack?.name}</p>
      <button onClick={() => onDeleteClick(stack)}>
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default ChooseMeSkills;
