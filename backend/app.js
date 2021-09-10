const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const routes = require('./routes');
const isProduction = environment === 'production';
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//? cors enabled for development only
if (!isProduction) {
    app.use(cors());
}
//? helmet security set up
app.use(helmet({
    contentSecurityPolicy: false
}));

//? _csrf token set and req.csrfToken method created
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
    );

//? has to run after csurf
app.use(routes);

module.exports = app;
