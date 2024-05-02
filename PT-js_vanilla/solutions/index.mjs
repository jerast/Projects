// #region solution-1

   /* 
   import net from 'node:net'

   export const ping = (ip, callback) => {
      const startTime = process.hrtime()

      const client = net.connect({ port: 80, host: ip }, () => {
         client.end()
         callback(null, { time: process.hrtime(startTime), ip })
      })

      client.on('error', (err) => {
         client.end()
         callback(err, null)
      })
   }

   ping('midu.dev', (err, info) => {
      if (err) console.error(err)
      else console.log(info)
   })
*/

//  ==========================================================================
// #region solution-2

/*    export const obtenerDatosPromise = () =>
      new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve({ data: 'datos importantes' })
         }, 2000)
      })

   obtenerDatosPromise()
      .then(response => console.log( response )) */

//  ==========================================================================
// #region solution-3

   // import fs from 'node:fs'
   import fsp from 'node:fs/promises'

   /* 
   export function procesarArchivo() {
      fs.readFile('../sources/input.txt', 'utf8', (error, contenido) => {
         if (error) {
            console.error('Error leyendo archivo:', error.message)
         }

         const textoProcesado = contenido.toUpperCase()

         fs.writeFile('../sources/output.txt', textoProcesado, (error) => {
            if (error) {
               console.error('Error guardando archivo:', error.message)
            }
            else {
               console.log('Archivo procesado y guardado con éxito')
            }
         })
      })
   }

   procesarArchivo() 
   */

   const processFile = async () => {
      try {
         const content = await fsp.readFile('../sources/input.txt', 'utf8')
         const newContent = content.toUpperCase()
         await fsp.writeFile('../sources/output.txt', newContent)

         console.log( 'All success' )
      } catch (error) {
         console.error( `Some failed: ${error.message}` )
      }
   }
   
   processFile()

//  ==========================================================================
// #region solution-4

