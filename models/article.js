const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

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
  }
})
// This will create a slug from a title every time validation is run
articleSchema.pre('validate', function(next) {
  if(this.title) {
    this.slug = slugify(this.title, { lower: true,
       strict: true })
  }
  next()
})

module.exports = mongoose.model('Article', articleSchema)