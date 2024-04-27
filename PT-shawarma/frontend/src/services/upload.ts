import { API_HOST } from "../config";
import { ApiUploadResponse, Data } from "../types";

export const uploadFile = async (file: File): Promise<[Error?, Data?]> => {
   const formData = new FormData()
   formData.append('file', file)

   try {
      const response = await fetch(`${API_HOST}/api/files`, {
         method: 'POST',
         body: formData
      })

      if (!response.ok) 
         return [new Error(`Error uploading file: ${response.statusText}`)]

      const json = await response.json() as ApiUploadResponse
      return [undefined, json.data]
   } catch (error) {
      if (error instanceof Error)
         return [error]
   }

   return [new Error('Unknown error')]
}