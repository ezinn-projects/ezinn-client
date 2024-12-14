import { StarIcon } from "lucide-react";

function ReviewSection() {
  return (
    <div className="border p-4 rounded-lg flex items-center justify-between">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">5,0</p>

        <div className="flex items-center gap-x-[1px]">
          <StarIcon className="size-2 stroke-black dark:stroke-white" />
          <StarIcon className="size-2 stroke-black dark:stroke-white" />
          <StarIcon className="size-2 stroke-black dark:stroke-white" />
          <StarIcon className="size-2 stroke-black dark:stroke-white" />
          <StarIcon className="size-2 stroke-black dark:stroke-white" />
        </div>
      </div>

      <div className="h-10 w-px bg-gray-300" />

      <h3 className="font-semibold text-center">
        Được các cặp đôi <br /> lựa chọn
      </h3>

      <div className="h-10 w-px bg-gray-300" />

      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">52</p>

        <button className="text-blue-500 underline mt-1 text-sm">
          Đánh giá
        </button>
      </div>
    </div>
  );
}

export default ReviewSection;
