"use client";
import {
  ChevronLeftIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Vial from "../../../assets/vial.svg";

const MembersList = ({ members, groupId, friends }) => {
  const form = useForm({
    defaultValues: {
      members: members,
    },
  });

  const addMember = () => {
    form.setValue("members", [
      ...form.getValues("members"),
      {
        id: "new",
        name: "New Member",
        image: Vial,
      },
    ]);
  };

  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full mb-8">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <div className="flex flex-row">
              <Link
                href={`/groups/${groupId}`}
                className="bg-base-100 btn btn-circle mr-4"
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </Link>
              <h1 className="my-auto">Members</h1>
            </div>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon onClick={addMember} className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
      <ul className="h-full">
        {form.watch("members").map((member, idx) => (
          // being cheeky- prisma assigns IDs, but I need to add a new member to the list
          <li key={idx}>
            <div className="flex flex-row my-2 ml-2 justify-between">
              <div className="flex flex-row">
                <div className="btn btn-circle bg-base-200">
                  <Image
                    src={member?.image}
                    alt={member.name}
                    height={44}
                    width={44}
                    className="rounded-full h-12 w-12"
                  />
                </div>
                {member.id !== "new" ? (
                  <h2 className="text-2xl my-auto ml-4">{member.name}</h2>
                ) : (
                  <>
                    <select className="select select-bordered w-full max-w-xs ml-4">
                      {friends.map((friend) => (
                        <option key={friend.id}>{friend.name}</option>
                      ))}
                    </select>
                    <button className="btn btn-circle bg-base-100 ml-4">
                      <PaperPlaneIcon className="h-8 w-8" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="divider"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MembersList;
