const express = require('express');
const Article = require('./../models/article');
const { red } = require('color-name');
const router = express.Router();

router.get('/new', (req, res)=>{
    res.render('articles/new', {article: new Article()})
})

router.get('/:id', async (req, res)=>{
    const article = await Article.findById(req.params.id);
    if (article == null){
        red.redirect('/'); //if incorrect ID is entered, will redirect back to homepage
    }
    res.render('articles/show', { article: article});
})

router.post('/', async (req, res)=>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save(); //this is async function, therefore need to add async to the function ex: async (req, res)
        res.redirect(`/articles/${article.id}`);
    }catch(e){
        console.log(e);
        res.render('articles/new', { article: article});
    }
    
})

//this will delete the article. When the form in index.ejs has _method, as specified from server.js, it will proceed to delete the article
router.delete('/:id', async(req, res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;

