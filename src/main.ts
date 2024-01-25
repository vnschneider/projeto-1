import express from 'express'

import { db, firestore } from './database/firebase'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem vindo ao app!')
})

app.post('/posts', async (req, res) => {
  console.log(req.body)

  const title = req.body.title

  try {
    const docRef = await firestore.addDoc(firestore.collection(db, 'posts'), {
      title: title,
    })

    res.send(docRef.id)
  } catch (e: unknown) {
    console.log(e)

    res.status(500).send(e)
  }
})



app.listen(3000, () => {
  console.log('O serviço está sendo executado em: http://localhost:3000')
})
