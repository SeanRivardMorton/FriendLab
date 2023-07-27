"use client";
import {
  Cross1Icon,
  FileIcon,
  MinusIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import BottomTray from "../components/BottomTray";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonInset } from "../components/Form/button";

const WritingNewsCard = ({}) => {
  return (
    <>
      <ButtonTray>
        <button>News</button>
      </ButtonTray>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-col">
            <div className="flex flex-row justify-start w-full">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered text-3xl w-full max-w-xs"
              />
            </div>
            <div className="divider"></div>
            <textarea
              className="textarea textarea-bordered w-full h-48"
              placeholder="Bio"
            ></textarea>
          </div>
        </div>
      </div>
      <BottomTray>
        <div className="flex flex-row justify-between w-full">
          <div>
            <button className="btn btn-circle bg-base-100">
              <FileIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="">
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
            <button className="btn btn-circle bg-base-100">
              <PaperPlaneIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </BottomTray>
    </>
  );
};

export default WritingNewsCard;
