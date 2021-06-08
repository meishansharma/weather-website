const request=require('request')

var geocode=(address,callback)=>{
    var coords_url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaXNoYW5zaGFybWEiLCJhIjoiY2twZmZxOTBzMGoyNzJubzQ1Y3BwYjA3cSJ9.FjByhpVzoa3aYBlwqs-VTw&limit=1'
    request({url:coords_url,json:true},(error,request)=>{
        if(error){
            callback('Can not connect to geocoding service',undefined)
        }
        else if(request.body.features.length===0){
            callback('Search result not found. Try another search',undefined)
        }
        else{
            callback(undefined,{
                place_name: request.body.features[0].place_name,
                latitude: request.body.features[0].center[1],
                longitude: request.body.features[0].center[0]
            })
        }
    })
}

module.exports=geocode