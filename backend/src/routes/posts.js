import {
  listAllPosts,
  listPostsByAuthor,
  getPostById,
  createPost,
  deletePost,
  updatePost,
} from '../services/posts.js'
import { requireAuth } from '../middleware/jwt.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByAuthor(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('error listing posts', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
      return res.json(post)
    } catch (err) {
      console.error('error getting posts', err)
      return res.status(500).end()
    }
  })

  // Создать Пост с требуемой аутенфикацией requireAuth
  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const post = await createPost(req.auth.sub, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error getting posts', err)
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { title, author, contents, tags } = req.body
    const { sub } = req.auth.sub
    try {
      //const post = await updatePost(req.auth.sub, req.params.id, req.body)
      const post = await updatePost(id, sub, { title, author, contents, tags })
      return res.json(post)
    } catch (err) {
      console.error('error updating post', err)
      return res.status(500).end()
    }
  })

  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const { sub } = req.auth.sub
    try {
      // const { deletedCount } = await deletePost(req.params, req.auth.sub)
      const { deletedCount } = await deletePost(id, sub)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })


}
