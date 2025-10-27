interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 7 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className={`border-b border-border ${
            rowIndex % 2 === 0 ? "bg-background" : "bg-card"
          }`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <div className="h-4 bg-muted rounded animate-pulse mx-auto w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// export const TableSkeleton = () => (
//   <>
//     {[1, 2, 3, 4, 5].map((i) => (
//       <tr key={i} className="border-b border-gray-200">
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//         <td className="p-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse" />
//         </td>
//       </tr>
//     ))}
//   </>
// );
