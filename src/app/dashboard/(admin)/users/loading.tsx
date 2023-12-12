import { LoadingIcon } from "@/components/origin/shared/LoadingIcon";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingIcon color="fill-emerald-500" width="w-10" height="h-10" />
    </div>
  );
}