const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)
// The following "Articles" are iterated over in index.ejs
app.get('/', (req, res) => {
	const articles = [{
		title: 'Test Article',
		createdAt: new Date(),
		description: 'Test Description'

	}]
	res.render('index', { articles: articles })
})
app.listen(5000)