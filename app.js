const  express = require("express");
const  bodyParser = require("body-parser");
const {redirect} = require("express/lib/response");
const https  = require("https");
const app = express();
const randomMsg = require(__dirname+'/greetings.js');
const applicant = require(__dirname+'/applicantData.js');
const users = require(__dirname+'/signup.js');
const PORT = 3000;

//set the view engine and the body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine' , 'ejs');

let usrPage = 'login';
let btn = 'signup';
let errorMsg = '';
let id = {};
app.get('/' , (req  ,res)=>{
		   
	res.render('welcome', {
		   page: usrPage,
		   msg:randomMsg.getGreetings() ,
	           btnMssg:randomMsg.btnMessage(usrPage) ,
		   btnName:btn,
		   err:errorMsg,
	});
});

app.get('/home' , (req , res )=>{
		   //get weather data
			const city = 'Pune';
           const apiKey ="7598027fad1bdd5b2cef0c2a0f4e8c3e";
           const unit = "metric";
           const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+ unit +"&appid="+apiKey;
		   let temp;
		   let description;
		   let icon;
		   let imgUrl;
		   https.get(url , (response)=>{
                  console.log(response.statusCode);                                                                  //listen for any incoming data from the servers                  
		  response.on('data' , (data)=>{                  //the incomeing data will be in hexcademinal fromat 
                  const weatherData =  JSON.parse(data);          //convert the incoming data into Javascript object
                  //get the individual data
                  	  temp  = weatherData.main.temp ;
                      description = weatherData.weather[0].description ;
                  	  icon   = weatherData.weather[0].icon ;
                  	  imgUrl  = "https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
					
					 res.render('home' ,{
		    				msg:randomMsg.getGreetings(),
		    				applicant:applicant.info,
		    				usr:id,
							temp:temp,
							img:imgUrl
                  });
           });
	
	});
})

app.post('/home' , (req  , res)=>{
	console.log(req);
})


//THIS  IS A POST ROUTE JUST FOR REDIRECTION AND LOGIN PURPOSE
app.post('/login' ,(req , res)=>{
	//post for login 
	let newUsers = {
                email:req.body.email,
                fname:req.body.fname,
                lname:req.body.lname,
                pwd:req.body.pwd                //No hashing done just the regular password
        }

	let cred = {
		email : req.body.mail , 
		pwd   : req.body.pwd
	}
	//add users
	id = users.fetchUser(cred.email);
	if(id == ''){
		errorMsg = 'Credientials Not found try again';
	}
	//reroute any login request to home 
	let route = req.body.btnr;
	if(route == 'home'){
		
		//check the credientials for log in 
		if(!users.chkCred(cred)){
			errorMsg= 'Email or Password is incorrect';
			res.redirect('/');
		}
		else{
			errorMsg = '';
			return res.redirect('/home');
		}
	}else{
		//this will handle exceptions if users already exisit
          	if(!users.addUser(newUsers)){
                 		 errorMsg = 'User Already Exsist';
          	}
		else{
			errorMsg = "";
		}
		res.redirect('/');
	}
	res.redirect('/');

});


app.post('/' , (req , res)=>{
	usrPage = req.body.btn;
	if(usrPage === 'login'){
		btn = 'signup';
	}
	else{
		btn = 'login';
	}	
	res.redirect('/');
})

//APPLICANT PAGE
app.get('/applicant' , (req , res)=>{
	res.render('applicant',  {
		   applicantData:applicant.info;
		});
});


//CONTACT US PAGE 
app.get('/contactUs' , (req ,res)=>{
	res.render('contactUs');
})

app.listen(PORT , ()=>{
	console.log("Server started at port 3000");
});
