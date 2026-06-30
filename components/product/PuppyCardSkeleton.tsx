export const PuppyCardSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-warm-100" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-5 skeleton w-2/3" />
            <div className="h-3.5 skeleton w-1/2" />
          </div>
          <div className="w-6 h-6 skeleton rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-3 skeleton w-16" />
          <div className="h-3 skeleton w-16" />
          <div className="h-3 skeleton w-12" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 skeleton w-20" />
          <div className="h-5 skeleton w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};
