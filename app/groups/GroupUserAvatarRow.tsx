import Image from "next/image";

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupUserAvatarsRow;
