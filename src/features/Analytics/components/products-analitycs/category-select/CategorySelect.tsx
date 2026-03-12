'use client'

import { useState } from 'react'
import { Category } from '@/src/core/entitis/madre/analitics/products-analitycs/Category'

type Props = {
  categories: Category[]
  categoriesLoading: boolean

  searchResults: Category[]
  searchLoading: boolean
  onSearch: (query: string) => void

  onSelect: (categoryId: string) => void
}

export function CategorySelect({
  categories,
  categoriesLoading,
  searchResults,
  searchLoading,
  onSearch,
  onSelect,
}: Props) {

  const [query, setQuery] = useState('')

  const resultsToRender = query ? searchResults : []

  return (
    <div className="flex flex-col gap-5 p-4 bg-zinc-950/40 border border-zinc-800 rounded-2xl">

      {/* SELECT DE CATEGORIAS */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wide text-zinc-500">
          Categoría
        </label>

        {categoriesLoading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-400 py-2">
            <div className="w-4 h-4 border-2 border-zinc-600 border-t-blue-500 rounded-full animate-spin"></div>
            Cargando categorías...
          </div>
        ) : (
          <select
            className="w-full p-2.5 bg-zinc-800 rounded-xl border border-zinc-700
                       text-sm text-zinc-200
                       focus:ring-2 focus:ring-blue-500 focus:outline-none
                       transition"
            onChange={(e) => onSelect(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {'—'.repeat(c.level - 1)} {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* BUSCADOR */}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-wide text-zinc-500">
          Buscar categoría
        </label>

        <input
          type="text"
          placeholder="Ej: zapatillas"
          value={query}
          className="w-full p-2.5 bg-zinc-800 rounded-xl border border-zinc-700
                     text-sm text-zinc-200 placeholder:text-zinc-500
                     focus:ring-2 focus:ring-blue-500 focus:outline-none
                     transition"
          onChange={(e) => {
            const value = e.target.value
            setQuery(value)

            if (value.length > 2) {
              onSearch(value)
            }
          }}
        />

        {/* RESULTADOS BUSQUEDA */}
        {query && (
          <div className="mt-1 max-h-44 overflow-y-auto 
                          bg-zinc-900 border border-zinc-800 rounded-xl 
                          shadow-inner">

            {searchLoading && (
              <div className="flex items-center justify-center p-4 text-sm text-zinc-400">
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                Buscando categorías...
              </div>
            )}

            {!searchLoading && resultsToRender.length === 0 && (
              <div className="p-4 text-sm text-zinc-500 text-center">
                Sin resultados
              </div>
            )}

            {!searchLoading &&
              resultsToRender.map((c) => (
                <div
                  key={c.id}
                  className="px-3 py-2 text-sm text-zinc-200 
                             hover:bg-zinc-800 cursor-pointer 
                             transition-colors"
                  onClick={() => {
                    onSelect(c.id)
                    setQuery('')
                  }}
                >
                  {'—'.repeat(c.level - 1)} {c.name}
                </div>
              ))}
          </div>
        )}
      </div>

    </div>
  )
}