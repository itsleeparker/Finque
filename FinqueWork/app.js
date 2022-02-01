const  express = require("express");
const  bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

//set the view engine and the body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine' , 'ejs');

const greetings = ['Welcome' , 'Hello There' , 'Glad to see you'];
let usrPage = 'login';
let btn = 'signup';
app.get('/' , (req  ,res)=>{

	res.render('welcome', {
		   page: usrPage,
		   msg:greetings[0],
		   btnName:btn
	});
});

app.post('/' , (req , res)=>{
	usrPage = req.body.btn;
	if(usrPage === 'login'){
		btn = 'signUp';
	}
	else{
		btn = 'login';
	}
	res.redirect('/');
	console.log(usrPage);
})

app.listen(PORT , ()=>{
	console.log("Server started at port 3000");
});
