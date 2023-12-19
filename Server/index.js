require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors(
    {
        origin: ["https://yoga-reg.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, DELETE, PATCH, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = 4000 || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
