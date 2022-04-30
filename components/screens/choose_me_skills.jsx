/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import StackChip from "../stackchip";
import { useSimplyContext } from "../../context/SimplyContext";
import useSWR from "swr";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { firstLetterUpper } from "../utiles/textutils";

function ChooseMeSkills() {
  const { stackList, setStackList, setChangeDone } = useSimplyContext();
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
    setStackList(stackList.filter((items) => items.name != item.name));
    setChangeDone(true);
  };
  const handleOnSelect = (item) => {
    if (stackList.some((i) => i.name == item.name)) {
      handleRemoveStackFromList(item);
    } else {
      setStackList((items) => [
        ...items,
        {
          name: item.name,
          color: item.color,
          svg: item.versions.svg[0],
        },
      ]);
    }
    setChangeDone(true);
  };

  const formatResult = (item) => {
    return (
      <div className="p-1" key={item.name + Math.floor(Math.random() * 100)}>
        <i
          className={`devicon-${item.name}-${item.versions.font[0]} colored px-1`}
        ></i>{" "}
        <span className="font-medium">{firstLetterUpper(item.name)}</span>
      </div>
    );
  };
  return (
    <div>
      <div className=" w-full  m-2 rounded ">
        {/* <p className="font-semibold text-lg px-1">👇Your's</p> */}
        {stackList?.length != 0 ? (
          <div className="flex flex-wrap gap-2 mt-4">
            {stackList?.map((item, i) => {
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
        <div className="bg-gray-100  dark:bg-[#18181B] p-2 mt-4 rounded">
          <h2 className="font-semibold text-lg px-1">🧠Search stacks</h2>
          <div className="mt-4">
            <ReactSearchAutocomplete
              items={languages}
              onSelect={handleOnSelect}
              showIcon={false}
              inputDebounce={700}
              formatResult={formatResult}
              placeholder="search here.."
              // autoFocus
              styling={{
                borderRadius: "5px",
                border: "1px solid gray",
                boxShadow: "0px",
              }}
            ></ReactSearchAutocomplete>
          </div>
        </div>
      </div>
      {/* <div className=" w-full bg-gray-100 m-2 mt-4 p-4 rounded">
        <h2 className="font-semibold text-lg px-1">I ❤️ to do </h2>
        <textarea
          className="w-full mt-4 border-2 border-black p-4 rounded"
          placeholder="I ❤️ to love..... "
        />
        <div className="bg-gray-100 rounded  mt-2 p-2"></div>
      </div> */}
    </div>
  );
}
export default ChooseMeSkills;
