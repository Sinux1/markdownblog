const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) =>{
  res.render('articles/new', {article : Article() })
})

router.get('/:slug', async (req, res) =>{
  // This is the route function that executes
  // when the save button is successfully selected
  // to create a new article
  const article = await Article.findOne({slug: req.params.slug})
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
    res.redirect(`/articles/${article.slug}`)
  } catch (e){
    // Log to console the error
    console.log(e)
    res.render('articles/new', {article: article  })
  }
})

module.exports = router
