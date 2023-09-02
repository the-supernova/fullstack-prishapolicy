export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2 w-[15%] min-w-[12rem] animate-pulse">
      <div className="w-full h-[40vh] rounded-lg bg-gray-300" />
      <div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2" />
        <div className="w-1/2 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
