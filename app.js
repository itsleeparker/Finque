const  express = require("express");
const  bodyParser = require("body-parser");
const {redirect} = require("express/lib/response");
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
let crUser = {};
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

	res.render('home' ,{
		    msg:randomMsg.getGreetings(),
		    applicant:applicant.info,
		    usr:'Lee'
	});
})

app.post('/home' ,(req , res)=>{
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
	//reroute any login request to home 
	let route = req.body.btn;
	if(route == 'home'){
		
		//check the credientials for log in 
		if(!users.chkCred(cred)){
			errorMsg= 'Email or Password is incorrect';
			res.redirect('/');
		}
		else{
			errorMsg = '';
			res.redirect('/home');
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

//CONTACT US PAGE 
app.get('/contactUs' , (req ,res)=>{
	res.render('contactUs');
})

app.listen(PORT , ()=>{
	console.log("Server started at port 3000");
});
