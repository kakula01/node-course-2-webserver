const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT|| 5000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now} :${req.method}:${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log +'\n', (err)=>{
		if(err){
			console.log('unable to append server.log file')
		}
	});
	next();
});
app.use((req,res,next)=>{
	res.render('maintanance.hbs');
	next();
});

hbs.registerHelper('getCurrentYear', ()=>{
	 return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})
app.get('/', (req, res)=>{
	res.render('home.hbs',{
		pageTitle:'Home page',
		welcomeMsg: 'Welcome KEERTHI'
	})
});

app.get('/about', (req,res)=>{
	res.render('about.hbs',{
		pageTitle:'New About page'
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		error: '404 Not found',
		Message:'The requested URL is not found'
	});
});

app.listen(port, ()=>{
	console.log(`server is up on port ${port}`)
});