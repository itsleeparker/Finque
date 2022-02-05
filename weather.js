const https  = require("https"); 
var crWeather = {};
exports.getWeather = function(){
	const city = 'Pune';
         const apiKey ="7598027fad1bdd5b2cef0c2a0f4e8c3e";
         const unit = "metric";
         const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+ unit +"&appid="+apiKey;
         https.get(url , (response)=>{
                console.log(response.statusCode);

                                                                //listen for any incoming data from the servers
                response.on('data' , (data)=>{                  //the incomeing data will be in hexcademinal fromat 
                const weatherData =  JSON.parse(data);          //convert the incoming data into Javascript object
                //get the individual data
                const temp =weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon  = weatherData.weather[0].icon
                const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                //render the data on the browser
                //res.write("<p>The weather is likely " +description+"</p>");
                //res.write("<h1>The temprature in"+city+ "is"+temp+"</h1>");
                //res.write("<img src="+imgUrl+"  style=''text-align:center;''>");
                //res.send();
		
		return JSON.stringify(weatherData);
                });
		 
	 });

}
