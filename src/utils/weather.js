const request=require('request')

var weather=(obj,callback)=>{
    var weather_url='http://api.weatherstack.com/current?access_key=071345031328e6317e53d688e76c620a&query='+obj.latitude+','+obj.longitude
    request({url:weather_url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather API',undefined)
        }
        else{
            var data=response.body
            if(data.error!==undefined){
                callback('Unable to find the location',undefined)
            }
            else{
                // callback(undefined,{
                //     location:data.location.name,
                //     overall:data.current.weather_descriptions[0],
                //     temp:data.current.temperature,
                //     feels:data.current.feelslike 
                // })
                callback(undefined,data.current.weather_descriptions[0]+'.'+' It is currently '+data.current.temperature+' degress out. It feels like '+data.current.feelslike+' degrees')
            }
        }
    })
}

module.exports=weather