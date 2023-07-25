"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignoutPage = () => {
  return (
    <div className="card card-compact">
      <div className="card-body">
        <div className="card-title">You have been signed out.</div>
      </div>
    </div>
  );
};

export default SignoutPage;
