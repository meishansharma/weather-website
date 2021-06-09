const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode.js')
const weather=require('./utils/weather.js')
const hbs=require('hbs')

const port=process.env.PORT || 3000

var app = express()


// settting location(path) of views
app.set('views',path.join(__dirname,'../templates/views'))

// setup handlebars engine
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname,'../templates/partials'))

// to setup static director to serve
var public_dir_path=path.join(__dirname,'..','/public')
app.use(express.static(public_dir_path))



// app.get('',(request,response)=>{
//     response.send('Welcome to the root page')
// })


// for using hbs we need to give the route for index also

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ishan Sharma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:'Ishan Sharma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Ishan Sharma',
        message:'help message'
    })
})

// var call=(error,response)=>{
//     if(error)   obj.err1=error
//     else{
//         weather(response,(error1,response1)=>{
//             if(error1)  obj.err1=error1
//             else{
//                 obj.res1=response
//                 // console.log(response1)
//                 // console.log('In ' + response.place_name + ' overall weather is ' + response1.overall)
//                 // console.log('Temperature is '+response1.temp+' degress and it feels like ' + response1.feels + ' degrees')
//             }
//         })
//     }
// }

// console.log('hello')
// console.log(obj)

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please provide address'})
    }
    geocode(req.query.address,(error,response)=>{
        if(error)   return res.send({error:error})
        else{
            weather(response,(error1,response1)=>{
                if(error1)  res.send({error:error1})
                else{
                    // res.send({
                    //     place:response.place_name,
                    //     overall:response1.overall,
                    //     temperature:response1.temp,
                    //     feels_like:response1.feels
                    // })
                    res.send({
                        place:response.place_name,
                        returned_obj:response1
                        // forecast:response1
                    })
                }
            })
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('search term not provided')
    }
    console.log(req.query.search)
    res.send('hello')
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Ishan Sharma',
        title:'404',
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'Ishan Sharma',
        title:'404',
        error:'Error 404'
    })
})

// port value defined above both for heroku and locally

app.listen(port,()=>{
    console.log('Server is up and running on port '+ port)
})