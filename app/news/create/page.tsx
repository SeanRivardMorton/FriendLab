import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "../../api/getSession";
import { LOGIN_ROUTE } from "../../constants";
import WritingNewsCard from "../WritingNewsCard";

const NewsPage = async () => {
  const session = await getSession();
  if (!session?.user?.id) return redirect(LOGIN_ROUTE);
  return (
    <>
      <WritingNewsCard userId={session?.user.id} />
    </>
  );
};

export default NewsPage;
