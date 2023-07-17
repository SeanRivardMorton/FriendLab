"use client";
import React from "react";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

interface Props {
  link?: string;
}

const CopyLink: React.FC<Props> = ({ link }) => {
  const [isCopied, setIsCopies] = React.useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setIsCopies(true);
  };

  return (
    <button onClick={copyToClipboard} className="btn btn-primary my-2">
      {!isCopied ? "Copy Link to Clipboard" : "Copied"}
      <ClipboardCopyIcon className="ml-2" />
    </button>
  );
};

export default CopyLink;
