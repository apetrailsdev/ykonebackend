const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;

var { Client } = require('../models/client');

// scrape data from url using axios
// with async / await 
const fetchData = async function(req, res) {
    try {
        const response = await axios.get('https://jointhecrew.in/clients/');
        const $ = cheerio.load(response.data)
        
        let clients = [];
        let headers = [];

        $('.table th').each(function(index, item) {
            headers[index] = $(item).html().toLowerCase();
        });

        $('.table tr').has('td').each(function() {
            let arrayItem = {};
            $('td', $(this)).each(function(index, item) {
                arrayItem[headers[index]] = $(item).html();
            });
            
            clients.push(arrayItem);
        });
        
        res.status(200).send(clients);
    } catch (err) {
        console.log(err);
    }
}

// Get All Clients
const getAll = async function(req, res) {
    try {
        let doc = await Client.find({}).limit(100).sort({ createdAt: -1 });
        if(doc)
            res.status(200).json(doc);
    } catch(err) {
        console.log(err);
    }
}

// Save Client
const saveClient = async function(req, res) {
    let body = _.pick(req.body, ['name', 'phone', 'email', 'company', 'zip']);

    var client = new Client({
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email.trim(),
        company: body.company.trim(),
        zip: body.zip.trim()
    });

    try {
        let newClient = await client.save();
        res.status(201).json({
            error: false,
            msg: 'Client added successfully!'
        });
    } catch(err) {
        console.log(err);
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send(new MyError('Duplicate key', [err.message]));
        }
    
        res.status(500).send(err);
    }
}

// Get Client details from ID
const getClientDetails = async function(req, res) {

    try {
        let client = await Client.findById({ '_id': req.params.id });

        res.send(client);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Update client by ID
const updateClientById = function(req, res) {
    let _id = req.params.id;
    let obj = req.body;

    if(!ObjectId.isValid(_id)) {
        return res.json({
            err: true,
            msg: 'id must be a valid'
        });
    }

    Client.findByIdAndUpdate(_id, obj, { new: true }, function(err, doc) {
        if (err)
            throw err;
        
        if (!doc) {
            return res.status(404).json({
                error: true,
                msg: 'Could not find client'
            });
        }
        
        res.json({
            error: false,
            msg: 'Client Updated!'
        });
        
    });
}

// Delete client by ID
const deleteClientById = async function(req, res) {
    let id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.json({
            message: 'id must be a valid'
        });
    }
    
    try {
        let client = await Client.findOneAndDelete({ _id: id });
    
        if (!client) {
          return res.status(404).send();
        } else {
          res.status(204).send('Client successfully deleted');
        }
      } catch (err) {
        return res.status(500).send(err);
      }
}

module.exports = {
    fetchData,
    getAll,
    saveClient,
    getClientDetails,
    updateClientById,
    deleteClientById
}