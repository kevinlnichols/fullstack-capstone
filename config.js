exports.DATABASE_URL = 
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    //'mongodb://knichols:fcApst0ne@ds159235.mlab.com:59235/fullstack_capstone';
    'mongodb://localhost/capstone';
    exports.PORT = process.env.PORT || 8080;
    exports.JWT_SECRET = process.env.JWT_SECRET;
    exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';