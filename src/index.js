import template from './template.html'

const html = () => {
  return new Response(template, {
    headers: { 'Content-type': 'text/html' }
  })
}

const todos = async (request, env) => {
  switch (request.method) {
    case 'PUT':
      const newTodos = await request.json()
      await env.TODOS.put("todos", JSON.stringify(newTodos))
      return new Response(JSON.stringify(newTodos), {
        headers: { 'Content-type': 'application/json' }
      })
    case 'GET':
      const todosArray = await env.TODOS.get("todos", "json") || []
      return new Response(JSON.stringify(todosArray), {
        headers: { 'Content-type': 'application/json' }
      })
    default:
      return new Response("Method not allowed", {
        statusCode: 405
      })
  }
}

const notFound = () => {
  return new Response("Not found", {
    statusCode: 404
  })
}


export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    switch (url.pathname) {
      case '/':
        return html()
      case '/todos':
        return todos(request, env)
      default:
        return notFound()
    }
  },
};
