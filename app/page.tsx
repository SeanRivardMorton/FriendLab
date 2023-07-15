import React from "react";
import { getServerSession } from "next-auth/next";
import { Client } from "@vercel/postgres";
import ClientProtectedPage from "./protected/client/page";

export default async function Home() {
  return (
    <main>
      <ClientProtectedPage>
        <div className="hero text-center min-h-[92vh]">
          <div className="hero-content flex flex-col">
            <h1 className="text-2xl my-2">You don't have any friends. Sad.</h1>
            <button className="btn btn-primary my-2" type="submit">
              Invite Friends
            </button>
          </div>
        </div>
      </ClientProtectedPage>
    </main>
  );
}
