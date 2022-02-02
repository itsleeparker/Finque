const  express = require("express");
const  bodyParser = require("body-parser");
const {redirect} = require("express/lib/response");
const app = express();
const randomMsg = require(__dirname+'/greetings.js');
const applicant = require(__dirname+'/applicantData.js');
const PORT = 3000;

//set the view engine and the body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine' , 'ejs');

let usrPage = 'login';
let btn = 'signup';
app.get('/' , (req  ,res)=>{

	res.render('welcome', {
		   page: usrPage,
		   msg:randomMsg.getGreetings() ,
	           btnMssg:randomMsg.btnMessage(usrPage) ,
		   btnName:btn
	});
});

app.get('/home' , (req , res )=>{

	res.render('home' ,{
		    msg:randomMsg.getGreetings(),
		    carousel:applicant.info
	});
})

app.post('/home' ,(req , res)=>{
	//reroute any login request to home 
	let route = req.body.btn;
	if(route == 'home'){
		res.redirect('/home');
	}else{
		res.redirect('/');
	}
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

app.listen(PORT , ()=>{
	console.log("Server started at port 3000");
});
