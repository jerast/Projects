import { API_HOST } from "../config";
import { ApiSearchResponse, Data } from "../types";

export const searchData = async (search: string): Promise<[Error?, Data?]> => {
   try {
      const response = await fetch(`${API_HOST}/api/users?q=${search}`)

      if (!response.ok) 
         return [new Error(`Error searching data: ${response.statusText}`)]

      const json = await response.json() as ApiSearchResponse
      return [undefined, json.data]
   } catch (error) {
      if (error instanceof Error)
         return [error]
   }

   return [new Error('Unknown error')]
}