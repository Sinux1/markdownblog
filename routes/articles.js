// Node framework
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) =>{
  res.render('articles/new', {article : Article() })
})


router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
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

router.post('/', async (req, res, next) =>{
  req.article = new Article()
  next()
} , saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) =>{
  req.article = await Article.findById(req.params.id)
  next()
} , saveArticleAndRedirect('new'))

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
      article.title = req.body.title,
      article.description = req.body.description,
      article.markdown = req.body.markdown
  
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e){
      // Log to console the error
      console.log(e)
      res.render(`articles/${article.slug}`, {article: article  })
    }
  }
}

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router
