const express = require('express');
const cors = require('cors')
const {fetchArticle,fetchArticleWithQuery} = require('./scrape');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.post('/articles',(req,res)=>{
    const queryText = req.body.query;   
    console.log(queryText);
    fetchArticleWithQuery(queryText).then(value =>{
      res.status(200).send(value);
    })

});


app.get('/test',  (req,res)=>{
    fetchArticle().then(value =>{
      res.send(value);
    })
    // console.log(result);
    // res.send(result);
})

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'),()=>{
    console.log("Server listening on ",app.get('port'));
});