import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express()
const port = process.env.PORT ?? 3000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let userData: Array<Record<string, string>> = []

app.use(cors()) // Enable cors

app.post('/api/files', upload.single('file'), async (request, response) => {
   // 1. Extract file from request
   const { file } = request

   // 2. Validate that we have file
   if (!file) {
      return response.status(500).json({ message: 'El archivo es requerido' })
   }

   // 3. Validate the mimetype (csv)
   if (file.mimetype !== 'text/csv') {
      return response.status(500).json({ message: 'El archivo debe ser CSV' })
   }

   let json: Array<Record<string, string>> = []
   try {

      // 4. Transform el File (Buffer) to string 
      const csv = Buffer.from(file.buffer).toString('utf-8')
      console.log(csv)

      // 5. Transform string (csv) to JSON
      json = csvToJson.fieldDelimiter(';').csvStringToJson(csv)

   } catch (error) {
      return response.status(500).json({ message: 'Error convirtiendo el archivo' })
   }

   // 6. Save the JSON to db (or memory)
   userData = json

   // 7. Return 200 with the message and the JSON
   return response.status(200).json({ data: userData, message: 'El archivo se cargó correctamente' })
})

app.get('/api/users', async (request, response) => {
   // 1. Extract the query param 'q' from the request
   const { q } = request.query

   // 2. Validate that we have the query param
   if (!q) {
      return response.status(500).json({ message: 'El Query param `q` es requerido'})
   }
   if (Array.isArray(q)) {
      return response.status(500).json({ message: 'El Query param `q` debe ser texto'})
   }
   
   // 3. Filter the data from the ab (or memory) with the query param
   const search = q.toString().toLowerCase()
   const filteredData = userData.filter(row => 
      Object
         .values(row)
         .some(value => value.toLowerCase().includes(search))
   )   

   // 4. Return 200 with the filtered data
   return response.status(200).json({ data: filteredData })
})

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`)
})