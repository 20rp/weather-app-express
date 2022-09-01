const app = express();
const mysql = require("mysql";);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:  true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password : 'th3Right3ousFury!',
    datbase : 'nodelogin'
});