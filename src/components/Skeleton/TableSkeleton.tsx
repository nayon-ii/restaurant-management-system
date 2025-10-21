export const TableSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <tr key={i} className="border-b border-gray-200">
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
        <td className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
      </tr>
    ))}
  </>
);
