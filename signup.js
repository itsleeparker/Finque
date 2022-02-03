const users = [ 
	{
		email:'leeparker0910@gmail.com',
		fname:'Lee',
		lname:'Parker',
		pwd: 'aa'
	}
];
let currentUser={};
exports.addUser = function(obj){
	if(userExist(obj)){
		return false;
	}
	users.push(obj);
	console.log(users);
	return true;
}

exports.chkCred = function(obj){
	//check if user id exits or not 
	if(!userExist(obj)){
		return false;	
	}
	//check for correct password
	console.log("Current User"+currentUser)
	if(obj.pwd != currentUser.pwd){
		return false;		
	}
	return true;
	console.log('All good');
}

exports.fetchUser = (email)=>{
	for(let i=0; i<users.length ;++i){
		if(users[i].email == email){
			return users[i];
		}
	}
}

function userExist(obj){
	if(users.length != 0)                 
        {                                     
                for(let i=0 ; i<users.length ; ++i){
                        if(users[i].email == obj.email){
				currentUser = users[i];
                                return true; 
                        }                     
                }                             
        }
	else{
		return false;
	}
}

exports.currentUser;
