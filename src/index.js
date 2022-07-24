import { Hono } from 'hono'
import template from './template.html'

const app = new Hono()

app.get('/', c => c.html(template))

app.get('/todos', async c => {
  const todosArray = await c.env.TODOS.get("todos", "json") || []
  return c.json(todosArray)
})

app.put('/todos', async c => {
  const newTodos = await c.req.json()
  await c.env.TODOS.put("todos", JSON.stringify(newTodos))
  return c.json(newTodos)
})

app.all('*', c => {
  c.status(404)
  return c.text("Not found")
})

export default app