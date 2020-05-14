module.exports = {
    getMongoConnection: function () {
        //mongodb connection string
        console.log('connected to mongo server too!');
        
        return 'mongodb+srv://eric:eric111@mycluster-dex7f.mongodb.net/test?retryWrites=true&w=majority';
    }
}