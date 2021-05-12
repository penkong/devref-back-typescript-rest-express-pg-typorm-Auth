/*
 ** Description :
 */

import 'reflect-metadata'

import { createConnection } from 'typeorm'

import { app } from './app'
import { config, TYPEORM } from './config'

// ---

const { PORT } = config

// ---
if (TYPEORM)
  createConnection(TYPEORM!)
    .then(() => {
      app.listen(parseInt(PORT!), () => {
        console.log(`Listening on ${PORT}!`)
      })
    })
    .catch(err => {
      console.log(err)
    })
