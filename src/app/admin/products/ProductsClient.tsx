// 'use client';
// 
// import Image from 'next/image';
// import { useState } from 'react';
// import {
//   getMadreProducts,
//   MadreProduct,
// } from '@/src/service/madreProducts.read';
// 
// const PAGE_SIZE = 24;
// 
// type Props = {
//   initialData: {
//     items: MadreProduct[];
//     total: number;
//   };
// };
// 
// export default function ProductsClient({ initialData }: Props) {
//   const [items, setItems] = useState<MadreProduct[]>(initialData.items);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [sku, setSku] = useState('');
// 
//   const totalPages = Math.ceil(initialData.total / PAGE_SIZE);
// 
//   async function fetchProducts(page: number, searchSku?: string) {
//     setLoading(true);
// 
//     const res = await getMadreProducts({
//       offset: (page - 1) * PAGE_SIZE,
//       limit: PAGE_SIZE,
//       sku: searchSku || undefined,
//     });
// 
//     setItems(res.items);
//     setCurrentPage(page);
//     setLoading(false);
//   }
// 
//   function goToPage(page: number) {
//     if (page < 1 || page > totalPages) return;
//     fetchProducts(page, sku);
//   }
// 
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-end justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Productos
//           </h1>
//           <p className="text-sm text-gray-500">
//             {initialData.total} productos en catálogo
//           </p>
//         </div>
//       </div>
// 
//       {/* Search */}
//       <div className="flex items-center gap-3">
//         <input
//           type="text"
//           placeholder="Buscar por SKU…"
//           value={sku}
//           onChange={(e) => setSku(e.target.value)}
//           className="
//             w-72
//             rounded-lg
//             border border-gray-300
//             bg-white
//             px-4 py-2
//             text-sm
//             focus:outline-none
//             focus:ring-2 focus:ring-black/10
//           "
//         />
// 
//         <button
//           onClick={() => fetchProducts(1, sku)}
//           disabled={loading}
//           className="
//             rounded-lg
//             bg-black
//             px-5 py-2
//             text-sm font-medium text-white
//             transition
//             hover:bg-gray-900
//             disabled:opacity-50
//           "
//         >
//           Buscar
//         </button>
// 
//         {sku && (
//           <button
//             onClick={() => {
//               setSku('');
//               fetchProducts(1);
//             }}
//             className="text-xs text-gray-500 hover:underline"
//           >
//             Limpiar
//           </button>
//         )}
//       </div>
// 
//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {items.map((product) => (
//           <ProductCard key={product.sku} product={product} />
//         ))}
//       </div>
// 
//       {/* Pagination */}
//       <div className="flex items-center justify-between pt-8">
//         <div className="text-sm text-gray-500">
//           Página{' '}
//           <span className="font-medium text-gray-800">
//             {currentPage}
//           </span>{' '}
//           de{' '}
//           <span className="font-medium text-gray-800">
//             {totalPages}
//           </span>
//         </div>
// 
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1 || loading}
//             className="
//               rounded-lg
//               border border-gray-300
//               bg-white
//               px-4 py-2
//               text-sm font-medium text-gray-700
//               transition
//               hover:bg-gray-50
//               disabled:opacity-40
//             "
//           >
//             ← Anterior
//           </button>
// 
//           <button
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages || loading}
//             className="
//               rounded-lg
//               border border-gray-300
//               bg-white
//               px-4 py-2
//               text-sm font-medium text-gray-700
//               transition
//               hover:bg-gray-50
//               disabled:opacity-40
//             "
//           >
//             Siguiente →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// /* ---------- Card ---------- */
// 
// function ProductCard({ product }: { product: MadreProduct }) {
//   const image = product.images?.[0]?.url;
// 
//   const statusStyles: Record<string, string> = {
//     active: 'bg-green-100 text-green-700',
//     paused: 'bg-yellow-100 text-yellow-700',
//     deleted: 'bg-red-100 text-red-700',
//   };
// 
//   return (
//     <div
//       className="
//         rounded-xl
//         border border-gray-200
//         bg-white
//         p-4
//         space-y-3
//         transition
//         hover:shadow-md
//       "
//     >
//       {/* Imagen */}
//       <div className="relative h-40 w-full rounded-lg bg-gray-50">
//         {image && (
//           <Image
//             src={image}
//             alt={product.title}
//             fill
//             sizes="(max-width: 768px) 100vw, 25vw"
//             className="object-contain p-3"
//             unoptimized
//           />
//         )}
//       </div>
// 
//       {/* Info */}
//       <div className="space-y-1">
//         <div className="text-xs text-gray-400">
//           SKU {product.sku}
//         </div>
// 
//         <div className="text-sm font-medium text-gray-900 line-clamp-2">
//           {product.title}
//         </div>
//       </div>
// 
//       {/* Footer */}
//       <div className="flex items-center justify-between pt-2">
//         <div>
//           <div className="text-base font-semibold text-gray-900">
//             ${product.price.toLocaleString()}
//           </div>
//           <div className="text-xs text-gray-500">
//             Stock: {product.stock}
//           </div>
//         </div>
// 
//         <span
//           className={`
//             rounded-full
//             px-3 py-1
//             text-xs font-medium
//             ${statusStyles[product.status] ?? 'bg-gray-100 text-gray-600'}
//           `}
//         >
//           {product.status.toUpperCase()}
//         </span>
//       </div>
//     </div>
//   );
// }