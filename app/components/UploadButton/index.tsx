"use client";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import React, { useCallback, useState } from "react";
import type { FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "../../utils/uploadthing";

const fileTypes = ["image/png", "image/jpeg", "image/gif"];

interface MultiUploaderProps {
  endpoint: string;
  onSuccess: (e) => void;
  onError: (e) => void;
  children: React.ReactNode;
}

export function MultiUploader({
  endpoint,
  onSuccess,
  onError,
  children,
}: MultiUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log(res);
      onSuccess?.(res);
    },
    onUploadError: (res) => {
      alert(res);
      onError?.(res);
    },
  });

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    startUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
