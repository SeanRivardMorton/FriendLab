import Image from "next/image";

const GroupUserAvatarsRow = ({ group }) => {
  return (
    <>
      {group?.members?.map((member) => (
        <div key={member.id} className="avatar">
          <div className="btn btn-circle">
            <Image
              src={member.image}
              width={44}
              height={44}
              alt={member.name}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupUserAvatarsRow;
