import { useState } from 'react'
import { Data } from './types'
import { uploadFile } from './services/upload'
import { Toaster, toast } from 'sonner'
import './App.css'
import { Search } from './components/Search'

const APP_STATES = {
  IDLE: 'idle', // al entrar
  ERROR: 'error', // cuando hay un error
  READY_UPLOAD: 'ready_upload', // al elegir el archivo
  UPLOADING: 'uploading', // mientras se sube
  READY_USAGE: 'ready_usage', // después de subir
} as const

type AppStatusType = typeof APP_STATES[keyof typeof APP_STATES]

function App() {
  const [ appStatus, setAppStatus ] = useState<AppStatusType>(APP_STATES.IDLE)
  const [ file, setFile ] = useState<File | null>(null)
  const [ data, setData ] = useState<Data>([])

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

  return appStatus !== APP_STATES.READY_USAGE ? (
    <>
      <Toaster />
      <h4>Challenge: Upload CSV + Search</h4>
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
  ) : (
    <>
      <h4>Challenge: Upload CSV + Search</h4>
      <Search initialData={data}/>
    </>
  )
}

export default App