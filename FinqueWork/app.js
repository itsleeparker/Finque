const  express = require("express");
const  bodyParser = require("body-parser");
const app = express();
const randomMsg = require(__dirname+'/greetings.js') 
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

app.post('/' , (req , res)=>{
	usrPage = req.body.btn;
	if(usrPage === 'login'){
		btn = 'signup';
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
