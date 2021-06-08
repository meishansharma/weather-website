
var weatherForm=document.querySelector('form')
var search_location=document.querySelector('input')
var forecast_para=document.getElementById('weather_result')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    forecast_para.innerHTML='...loading'
    var url='http://localhost:3000/weather?address='+search_location.value

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                forecast_para.innerHTML=data.error
            }
            else{
                forecast_para.innerHTML=data.place+'<br>'+data.forecast
            }
        })
    })
})