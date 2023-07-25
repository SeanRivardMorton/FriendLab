import Link from "next/link";

const FriendsList = ({ friends }) => {
  return (
    <ul>
      {friends?.map((friend) => {
        return (
          <li key={friend.id}>
            <Link href={`/profile/${friend.id}`} className="avatar my-2">
              <div className="h-11 mx-1 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {friend.image && (
                  <img src={friend.image} alt={`${friend.name}'s logo`} />
                )}
              </div>
              <span className="ml-4">{friend.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FriendsList;
