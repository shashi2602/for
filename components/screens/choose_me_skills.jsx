/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import StackChip from "../stackchip";
import { useSimplyContext } from "../../context/SimplyContext";
import { updateUserDoc } from "../../services/user.services";
import useSWR from "swr";

function ChooseMeSkills() {
  const { stackList, setStackList, setChangeDone } = useSimplyContext();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    "https://raw.githubusercontent.com/shashi2602/devicon/master/devicon.json",
    fetcher
  );

  const handleOnSelect = (item) => {
    setStackList((items) => [
      ...items,
      { name: item.name, color: item.color, svg: item.versions.svg[0] },
    ]);
    setChangeDone(true);
  };
  const handleRemoveStackFromList = (item) => {
    setStackList(stackList.filter((items) => items.name != item.name));
    setChangeDone(true);
  };

  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <span className="result-span">
          <i
            className={`devicon-${item.name}-${item.versions.font[0]} colored`}
          ></i>{" "}
          {item.name}
        </span>
      </div>
    );
  };
  return (
    <div>
      <div className=" w-full bg-gray-100 m-2 p-4 rounded ">
        <h2 className="font-semibold text-lg px-1">Tech stacks 🧠</h2>
        <div className="mt-4">
          <ReactSearchAutocomplete
            items={data}
            onSelect={handleOnSelect}
            showIcon={false}
            inputDebounce={500}
            formatResult={formatResult}
            placeholder="reactjs...."
            styling={{
              borderRadius: "5px",
            }}
          ></ReactSearchAutocomplete>
        </div>
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
