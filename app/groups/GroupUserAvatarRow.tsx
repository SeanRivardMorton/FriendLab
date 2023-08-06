import Image from "next/image";
import Link from "next/link";

import { CircleButtonLink } from "../components/Form/button";

const GroupUserAvatarsRow = ({ group }) => {
  return (
    <div className="mx-2 flex flex-row">
      {group?.members?.map((member) => (
        <div key={member.id}>
          <Image
            className="mx-1 my-0 h-12 w-12 rounded-full border-2 border-base-200"
            src={member.image}
            width={22}
            height={22}
            alt={member.name}
          />
        </div>
      ))}
    </div>
  );
};

export const EventUserAvatarsRow = ({ attendees }) => {
  return (
    <div className="mx-2 flex flex-row">
      {attendees?.map((member) => (
        <CircleButtonLink key={member.id} href={`/friends/${member.id}`}>
          <Image
            className="rounded-full"
            src={member.image}
            width={44}
            height={44}
            alt={member.name}
          />
          {/* Will this be replaced with CircleButtonLinkInset from form/button.tsx so when they become clickable keyboard works too?*/}
        </CircleButtonLink>
      ))}
    </div>
  );
};

export default GroupUserAvatarsRow;
