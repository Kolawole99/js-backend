import { Hono } from 'hono'
import { logger } from 'hono/logger'

import bookRoutes from './books/routes.js'

const app = new Hono({ strict: true })

app.use(logger())

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.route("/books", bookRoutes)

export default app
