const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true , useUnifiedTopology: true 
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


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


app.use('/articles', articleRouter)

app.listen(5000)