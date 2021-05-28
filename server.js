const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
// I need to better understand whats happening behind these calls
// so that I can extend to different databases, and to aws eventually...
mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true 
})
// This must be how the .ejs files are "interpreted"?
app.set('view engine', 'ejs')
// when set to false, parses url encoded data with querystring lib, 
// when true parsed with qs lib. When extended, allows for rich abjoects and arrays.
// I am still not sure what this means... so need to look it up.
app.use(express.urlencoded({ extended: false }))
// Whenever the parameter _method is set in any type
// of form situation, allows to override the method (for delete)
app.use(methodOverride('_method'))

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

app.listen(5001)