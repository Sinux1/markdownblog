const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) =>{
  res.render('articles/new', {article : Article() })
})

router.get('/:id', async (req, res) =>{
  // This is the route function that executes
  // when the save button is successfully selected
  // to create a new article
  const article = await Article.findById(req.params.id)
  if (article == null) res.redirect('/')
  // This will display the articles/show file and pass in an article
  res.render('articles/show',{ article: article })

})

router.post('/', async (req, res) =>{
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  })

  try {
    article = await article.save()
    res.redirect(`/articles/${article.id}`)
  } catch (e){
    // Log to console the error
    res.render('articles/new', {article: article  })
  }
})

module.exports = router
