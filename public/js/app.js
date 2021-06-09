
var weatherForm=document.querySelector('form')
var search_location=document.querySelector('input')
var forecast_para=document.getElementById('weather_result')
var forecast_img=document.getElementById('weather_img')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    forecast_img.innerHTML="...loading"
    forecast_para.innerHTML=""
    
    // forecast_para.innerHTML='...loading'
    var url='/weather?address='+search_location.value

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                forecast_img.innerHTML=data.error
                // forecast_para.innerHTML=data.error
            }
            else{
                // var a="<img src=\""+data.returned_obj.weather_icons[0]+"\">"
                forecast_img.innerHTML="<img src=\""+data.returned_obj.weather_icons[0]+"\">"
                // forecast_para.innerHTML=data.place+'<br>'+data.forecast
                forecast_para.innerHTML=data.place +"<br>"+data.returned_obj.weather_descriptions[0]+'.'+" It is currently "+data.returned_obj.temperature+" degress out. It feels like "+data.returned_obj.feelslike+" degrees"
            }
        })
    })
})