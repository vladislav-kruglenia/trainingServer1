module.exports = (app, myDb) => {
    require('./../app/controllers/products')(app, myDb)
};
