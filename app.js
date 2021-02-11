const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const user=require('./model/user')
const path=require('path')

mongoose.connect(db.url, (err, res)=>{
    console.log('Connection succesfully')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    var perPage=1
    var page=req.params.page || 1

    user.find().skip((perPage * page) - perPage).limit(perPage)
    .exec()
    .then(doc=>{
        user.countDocuments({}).exec((err, count)=>{
            res.render('pagnination', {
                record:doc,
                current:page,
                pages:Math.ceil(count/perPage)
            })
        })

    })
})

app.get('/:page', (req, res)=>{
    var perPage=1
    var page=req.params.page || 1

    user.find().skip((perPage * page) - perPage).limit(perPage)
    .exec()
    .then(doc=>{
        user.countDocuments({}).exec((err, count)=>{
            res.render('pagnination', {
                record:doc,
                current:page,
                pages:Math.ceil(count/perPage)
            })
        })

    })
})

app.listen(3000)