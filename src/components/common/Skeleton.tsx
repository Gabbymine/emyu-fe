export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="border-b border-gray-200 py-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-300 rounded"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
      <div className="h-12 bg-gray-300 rounded"></div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
