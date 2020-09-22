const express = require("express");
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app=express();

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')) //_method is the string that will be used for form situations that will override the form method, like method= "POST". See articles.js router.delete 

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc' });    
    //rendering the index.ejs and passing the articles into articles seen at in
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter);
app.listen(5000);