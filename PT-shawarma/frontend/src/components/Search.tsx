import React, { useEffect, useState } from "react"
import { Data } from "../types"
import { toast } from 'sonner'
import { searchData } from "../services/search"
import { useDebounce } from "@uidotdev/usehooks"

const DEBOUNCE_TIME = 300

export const Search = ({ initialData } : { initialData: Data }) => {
   const [ data, setData ] = useState<Data>( initialData )
   const [ search, setSearch ] = useState<string>(() => {
      const searchParams = new URLSearchParams(window.location.search)
      return searchParams.get('q') ?? ''
   })
   const debounceSearch = useDebounce(search, DEBOUNCE_TIME)

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)      
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
   }

   useEffect(() => {
      const newPath = debounceSearch === '' 
         ? window.location.pathname 
         : `?q=${debounceSearch}`

      window.history.replaceState({}, '', newPath)
   }, [debounceSearch])

   useEffect(
      () => {
         if (!debounceSearch) {
            setData(initialData)
            return
         }

         // llamar a la APi para filtrar los resultados
         searchData(debounceSearch)
            .then(response => {
               const [err, newData] = response
               if (err) {
                  toast.error(err.message)
                  return
               }

               if (newData) setData(newData)
            })
      }, [debounceSearch, initialData])

   return (
      <>
         <h1>Search</h1>
         <form onSubmit={handleSubmit}>
            <input 
               type="search" 
               placeholder="Buscar..."
               onChange={handleSearch}
               defaultValue={search}
            />
         </form>
         <ul>
            {
               data.map((row) => (
                  <li key={row.ID}>
                     <article>
                        {
                           Object
                              .entries(row)
                              .map(
                                 ([key, value]) => <p key={key}><strong>{key}:</strong> {value}</p>
                              )
                        }
                     </article>
                  </li>     
               ))
            }
         </ul>
      </>
   )
}