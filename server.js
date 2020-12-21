const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)
// The following "Articles" are iterated over in index.ejs
app.get('/', (req, res) => {
  const articles = [{
    title: 'Test Article1',
    createdAt: new Date(),
    description: 'Test Description 1'

  },
  {
    title: 'Test Article2',
    createdAt: new Date(),
    description: 'Test Description 2'

  }]
  res.render('articles/index', { articles: articles })
})
app.listen(5000)