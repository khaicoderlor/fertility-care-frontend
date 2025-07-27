// import type { Blog } from "../constants/BlogTypes";

// export const getUserTypeColor = (userType: string): string => {
//   return userType === "Doctor"
//     ? "bg-blue-100 text-blue-800"
//     : "bg-purple-100 text-purple-800";
// };

// export const getStatusColor = (status: string): string => {
//   switch (status) {
//     case "Published":
//       return "bg-green-100 text-green-800";
//     case "Process":
//       return "bg-yellow-100 text-yellow-800";
//     case "Draft":
//       return "bg-gray-100 text-gray-800";
//     case "Archived":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// export const BlogCard = ({ blog }: { blog: Blog }) => (
//   <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
//     {blog.imageUrl && (
//       <div className="aspect-video overflow-hidden">
//         <img
//           src={blog.imageUrl || "/placeholder.svg"}
//           alt={blog.title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//         />
//       </div>
//     )}

//     <div className="p-6">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <span
//             className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getUserTypeColor(
//               blog.userProfile.userType
//             )}`}
//           >
//             {blog.userProfile.userType}
//           </span>
//           <span
//             className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//               blog.status
//             )}`}
//           >
//             {blog.status}
//           </span>
//         </div>
//         <div className="flex items-center text-sm text-gray-500">
//           <svg
//             className="w-4 h-4 mr-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           {blog.readTime} min read
//         </div>
//       </div>

//       <div className="mb-3">
//         <span className="inline-block px-3 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
//           {blog.category}
//         </span>
//       </div>

//       <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-teal-600 cursor-pointer transition-colors line-clamp-2">
//         {blog.title}
//       </h2>

//       <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
//         {blog.content}
//       </p>

//       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//         <div className="flex items-center">
//           <img
//             src={blog.userProfile.avatar || "/placeholder.svg"}
//             alt={blog.userProfile.name}
//             className="w-10 h-10 rounded-full mr-3"
//           />
//           <div>
//             <p className="text-sm font-semibold text-gray-900">
//               {blog.userProfile.name}
//             </p>
//             <p className="text-xs text-gray-500">
//               {blog.userProfile.specialization || blog.userProfile.location}
//             </p>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
//           {blog.updatedAt && (
//             <p className="text-xs text-gray-400">
//               Updated {formatDate(blog.updatedAt)}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2 mt-4">
//         {blog.tags.slice(0, 3).map((tag, index) => (
//           <span
//             key={index}
//             className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   </article>
// );
