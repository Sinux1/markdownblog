// database
const mongoose = require('mongoose')
// markdown
const marked = require('marked')
// for url slugs made from title
const slugify = require('slugify')
// For sanitizing the markdown so no malicious html
// Look into the documentation of dompurify
const createDomPurify = require('dompurify')
// The brackets means it will only return the JSDOM portion of 
// what the require returns
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


const articleSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now() // or -> : Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})
// This will create a slug from a title every time validation is run
articleSchema.pre('validate', function(next) {
  if(this.title) {
    this.slug = slugify(this.title, { lower: true,
       strict: true })
  }

  if(this.markdown) {
    // marked(this.markdown) -> converts markdown to html, it is then
    // sanitized by dompurify.sanitize(this.markdown)
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }
  next()
})

module.exports = mongoose.model('Article', articleSchema)