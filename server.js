const http = require('http');
const math = require('mathjs')
let ex = require('express');
const axios = require('axios').default;

//var socketIo = require('socket.io');
let app = ex();
//let path = require('path')
var compression = require('compression');
var helmet = require('helmet');
var cors = require("cors");
//const server = http.createServer(app);
//const io = socketIo(server);
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(ex.json())
//process.env.PORT || 5000;
app.listen(4000);
app.use(ex.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//var dataString = '';
//process.env.PORT || 5000;
app.use(ex.urlencoded({ extended: false }));
app.post('/', (req, res) => {
    let x = Object.keys(req.body).toString()
   // let x = req.body
    console.log(x + ' ' +  'goes to python')

    var spawn = require('child_process').spawn
    var py = spawn('python3', ['2.py'])
    var data = x
    var dataString = '';
    py.stdout.on('data', function(data){
        dataString += data.toString();
    });
    py.stdout.on('end', function(){
        console.log('Result=',dataString)
        res.json(dataString)
        res.end()
        dataString='';
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
})


app.post('/math',(req,res) => {
    let r = Object.keys(req.body).toString()
    console.log(r +  'goes to /math')
    if (r.includes('π'))  {
        r = r.replace('π','pi')
    }
    if (r.includes('acos')) {
        r = r.replace('acos','(180/pi)*acos')
    }
    if (r.includes('asin')) {
        r = r.replace('asin','(180/pi)*asin')
    }
    if (r.includes('atan')) {
        r = r.replace('atan','(180/pi)*atan')
    }
    if (r.includes('cos') && (!r.includes('rad'))) {
        r = r.replace('cos(','cos(deg ')
    }
    if (r.includes('sin') && (!r.includes('rad'))) {
        r = r.replace('sin(','sin(deg ')
    }
    if (r.includes('tan') && (!r.includes('rad'))) {
        r = r.replace('tan(','tan(deg ')
    }
   try { let u = math.evaluate(r).toString();
        
    console.log(u)
    res.json(u)
    res.end() 
}
catch(err) {/*console.log('keep working')*/}
})
app.post('/deriv',(req,res) => {
    let w = Object.keys(req.body).toString()
    //console.log(w)
    if (w.includes('π'))  {
        w = w.replace('π','pi')
    }
    let o = 'math.'+ w;
    console.log(o)
    let q = eval(o).toString();
    if (q.includes('pi')) {
        q= q.replace('pi','π')
    }
    console.log(q)
    res.json(q)
    res.end()

})

app.post('/plot',(req,res) => {
    let w = Object.keys(req.body).toString()
    if (w.includes('π'))  {
        w = w.replace('π','pi')
    }
    if (w.includes('acos')) {
        w = w.replace('acos','(180/pi)*acos')
    }
    if (w.includes('asin')) {
        w = w.replace('asin','(180/pi)*asin')
    }
    if (w.includes('atan')) {
        w = w.replace('atan','(180/pi)*atan')
    }
    let r = w.split(',')
    console.log(w)
    console.log(r)
    let o = []
    r.forEach(eq => {
        if (eq.includes('log')) {
            const expr = math.compile(eq)

            // evaluate the expression repeatedly for different values of x
            const xValues = math.range(0, 50, 0.01).toArray()
            const yValues = xValues.map(function (x) {
              return expr.evaluate({x: x})
            })
       
            const trace1 = {
              x: xValues,
              y: yValues,
              type: 'scatter',
              name:eq
            }
            o.push(trace1)
        }
        else {
            const expr = math.compile(eq)

            // evaluate the expression repeatedly for different values of x
            const xValues = math.range(-50, 50, 0.01).toArray()
            const yValues = xValues.map(function (x) {
              return expr.evaluate({x: x})
            })
       
            const trace1 = {
              x: xValues,
              y: yValues,
              name:eq,
              type: 'scatter'
            }
            o.push(trace1)
        }
 
  
    })

    res.json(o)
    res.end()

})
/*app.post('/buttons',(req,res) => {
    let r = Object.keys(req.body).toString()
    let w = Object.keys(req.body)
    let t= req.body

    console.log('start')
    console.log(t)
    console.log(w[0]+ ' '+ 'caret')
    console.log(w[1]+ ' '+ 'num')
    let caretPos;
    console.log(r +  'goes to /buttons')
    if (caretPos=== '' || w[1] !== caretPos) { caretPos = w[1]} else { caretPos = w[1]}
    var textAreaTxt = w[2];
    let o =textAreaTxt.substring(0, caretPos);
    let q = textAreaTxt.substring(caretPos)
    let e = o + w[0] + q;
    let response = {
        data:e,
        caret:Number(caretPos)+1
    }
  
        
   // console.log(u)
    res.json(response)
    res.end() 

})*/

/*io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});*/
//console.log(dataString)
/*app.post('/solve',(req,res) => {
    let x = Object.keys(req.body).toString()
    console.log(x)

    var spawn = require('child_process').spawn
    var py = spawn('python3', ['3.py'])
    var data = `solve((${x}),dict=True)`
    var dataString = '';
    py.stdout.on('data', function(data){
        dataString += data.toString();
    });
    py.stdout.on('end', function(){
        console.log('Result=',dataString)
        res.json(dataString)
        res.end()
        dataString='';
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
})*/