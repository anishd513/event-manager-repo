const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=46d48002afd65fe78b9f448585e49b1a&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to weather serice",undefined);
        }
        else if(body.error)
            {
            callback("unable to find the given location");
            }
        else{
            
            callback(undefined,body.current.weather_descriptions[0]+" it currently  "+body.current.temperature+" it feels like "+body.current.feelslike)
        }
    });
}
module.exports=forecast;