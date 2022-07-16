/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { social } from "../utils/SocialTypes";
import { useSimplyContext } from "../../context/SimplyContext";
import Link from "next/link";
import Image from "next/image";
import Modal from "../modals/Modal";
import { useTheme } from "next-themes";
import InputField from "../forms/InputField";

function ChooseMeSocialMedia() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedSocial, setClickedSocial] = useState({});
  const [inputError, setInputError] = useState(false);
  const { theme } = useTheme();
  const { currentUser, setCurrentUser, setChangeDone } = useSimplyContext();

  function closeModal() {
    setIsOpen(false);
    setInputError(false);
  }

  function openModal(clicked) {
    setIsOpen(!isOpen);
    setClickedSocial({ ...clicked });
    if (
      currentUser?.social.some((socials) => socials.value === clicked.value)
    ) {
      setClickedSocial({
        ...currentUser?.social.filter(
          (socials) => socials.value === clicked.value
        )[0],
      });
    }
  }

  const handleLinkSubmit = (s) => {
    const final_selected_social = { ...s, id: currentUser?.social?.length + 1 };
    if (s.link == "") {
      setInputError(true);
    } else {
      if (currentUser.social.some((item) => item.value === s.value)) {
        setCurrentUser((prev) => ({
          ...prev,
          social: prev.social.map((item) => {
            if (item.value == s.value) {
              return { ...item, link: s.link };
            } else {
              return item;
            }
          }),
        }));
        setChangeDone(true);
      } else {
        setCurrentUser((prev) => ({
          ...prev,
          social: [...prev.social, final_selected_social],
        }));
        setChangeDone(true);
      }
      // closeModal();
    }
  };

  const handleRemoveSocial = (e) => {
    setCurrentUser(
      (prev = {
        ...prev,
        social: prev.social.filter((item) => item.value != e.value),
      })
    );
    setChangeDone(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClickedSocial((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {currentUser?.social?.length != 0 ? (
        <div className="w-full   rounded my-4 p-2">
          <div className="flex flex-wrap justify-center rounded-md gap-3">
            {currentUser?.social?.map((s, i) => {
              return (
                <div key={i}>
                  <div className=" p-2 flex gap-2  bg-gray-100 dark:bg-[#18181B]  rounded-md ">
                    <Image
                      alt={s.value}
                      src={
                        s.darkPath
                          ? theme == "dark"
                            ? `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}-dark.svg`
                            : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}.svg`
                          : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}.svg`
                      }
                      height={20}
                      width={20}
                    />
                    <Link
                      href={`${
                        s.link_placeholder
                          ? s.link_placeholder + s.link
                          : s.link
                      }`}
                      passHref={true}
                    >
                      <a
                        target="_blank"
                        className=" font-semibold text-lg capitalize"
                      >
                        {s?.value}
                      </a>
                    </Link>

                    <button onClick={() => handleRemoveSocial(s)}>
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
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center py-4 font-semibold">
          Click below social icon to add social account
        </p>
      )}
      <div className=" w-full rounded py-2">
        <div className="flex flex-wrap justify-center gap-3">
          {social.map((s, i) => {
            return (
              <div
                key={i}
                className=" dark:bg-black/40   cursor-pointer  h-24 w-24  flex justify-center border-shadow  transition duration-300 ease-in-out"
                onClick={() => {
                  openModal(s);
                }}
              >
                <div className="py-4 flex items-center ">
                  <div>
                    <Image
                      alt={s.value}
                      src={
                        s.darkPath
                          ? theme == "dark"
                            ? `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}-dark.svg`
                            : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}.svg`
                          : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${s.value}.svg`
                      }
                      height={40}
                      width={40}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          show={isOpen}
          showAdd={true}
          handleAdd={() => handleLinkSubmit(clickedSocial)}
          heading={"🤝Add Social"}
        >
          <Dialog.Title
            as="h3"
            className="text-lg flex font-medium leading-6 text-gray-900 dark:text-white capitalize"
          >
            <Image
              alt={clickedSocial.value}
              src={
                clickedSocial.darkPath
                  ? theme == "dark"
                    ? `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${clickedSocial.value}-dark.svg`
                    : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${clickedSocial.value}.svg`
                  : `https://raw.githubusercontent.com/shashi2602/shashi2602.github.io/master/${clickedSocial.value}.svg`
              }
              height={15}
              width={15}
            />

            <p className="px-2">{clickedSocial.value}</p>
          </Dialog.Title>
          <div className="mt-4">
            <InputField
              name="link"
              placeholder={clickedSocial.placeholder}
              value={clickedSocial?.link}
              onchange={handleChange}
              size={"w-full"}
            />
            {inputError && (
              <p className="text-red-600 font-semibold">required field</p>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}
export default ChooseMeSocialMedia;
