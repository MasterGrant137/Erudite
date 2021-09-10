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
const { ValidationError } = require('sequelize');

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

//? error handling
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

//? process sequelize errors
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
  });

//? format errors
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  });

module.exports = app;
