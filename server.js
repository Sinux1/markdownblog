const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true 
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
  // articles is a list of all articles in database, sorted in descending 
  // order of when saved
  const articles = await Article.find().sort({
    createdAt: 'desc'
  })
  // The index page is 'called' and articles is passed to it
  res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)

app.listen(5000)