import { useState } from "react"

export const Upload = () => {
   const [ file, setFile ] = useState<File | null>(null)

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const [file] = event.target.files ?? []
      
      if (!file) {
        setFile(null)
        setAppStatus(APP_STATES.IDLE)
        return;
      }
      
      setFile(file)
      setAppStatus(APP_STATES.READY_UPLOAD)
    }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
  
      if (appStatus !== APP_STATES.READY_UPLOAD || !file) {
        return
      }
  
      setAppStatus(APP_STATES.UPLOADING)
  
      const [err, newData] = await uploadFile(file)
      
      if (err) {
        setAppStatus(APP_STATES.ERROR)
        toast.error(err.message)
        return
      }
  
      console.log( newData )
      setAppStatus(APP_STATES.READY_USAGE)
      if (newData) setData(newData)
      toast.success('Archivo subido correctamente')
    }

   return (
      <>
        <form onSubmit={handleSubmit}>
         <label>
            <input 
               disabled={appStatus === APP_STATES.UPLOADING}
               type="file" 
               accept=".csv" 
               name="file" 
               onChange={handleInputChange} 
            />
         </label>
         { 
            (appStatus === APP_STATES.READY_UPLOAD || appStatus === APP_STATES.UPLOADING) && 
               <button disabled={appStatus === APP_STATES.UPLOADING}>
               { appStatus !== APP_STATES.UPLOADING ? 'Subir archivo' : 'Subiendo...' }
               </button>
         }
         </form>
      </>
   )
}