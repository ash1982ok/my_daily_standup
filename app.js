
var mongoose = require('mongoose');
var mongoDB = 'mongodb://' + process.env.IP + '/standup_db';

//Get the default connection
var db;
//Define a schema
var Schema ;
var StandupModelSchema;
var StandupModel;
var StandupModelInstance;

module.exports = class dbCon {
    
    
  
    constructor() {
        mongoose.connect(mongoDB);
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        Schema = mongoose.Schema;
        StandupModelSchema = new Schema({
            task: String, 
            date: Date
        });
        
        // Compile model from schema
        this.StandupModel = mongoose.model('StandupModel', StandupModelSchema );
        
        console.log('initializing db...');
    }

    saveTaskToDb(task, callback) {
        // Create an instance of model SomeModel
        StandupModelInstance = new this.StandupModel({ task: task, date: new Date() });

        // Save the new model instance, passing a callback
        StandupModelInstance.save(callback);
        
        console.info('saving record on db');
    }
    
    getTaskListFromDb(callback) {
        this.StandupModel.find().then(callback);
    }
    
    
    removeAllTasks(callback) {
        this.StandupModel.collection.remove();
        callback();
    }
};