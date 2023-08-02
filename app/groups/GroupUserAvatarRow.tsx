import Image from "next/image";
import Link from "next/link";

import { CircleButtonLink } from "../components/Form/button";

const GroupUserAvatarsRow = ({ group }) => {
  return (
    <div className="flex flex-row mx-2">
      {group?.members?.map((member) => (
        <div key={member.id} className="avatar">
          <div className="rounded-full ring-1 ring-white -ml-4">
            <Image
              src={member.image}
              width={22}
              height={22}
              alt={member.name}
            />
            {/* Will this be replaced with CircleButtonLinkInset from form/button.tsx so when they become clickable keyboard works too?*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export const EventUserAvatarsRow = ({ attendees }) => {
  return (
    <div className="flex flex-row mx-2">
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
