import express from 'express'

const app = express()
const port = 74

app.use(express.static('frontend/dist'))

app.listen(port, () => console.log(`Server has been started on port ${port}`))