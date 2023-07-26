```
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";

const Page = async () => {
  return (
    <>
      <div className="card card-compact bg-base-200 w-2/3 rounded-e-full">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h1>Title</h1>
            <button className="btn btn-circle bg-base-100">
              <PlusIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
```
