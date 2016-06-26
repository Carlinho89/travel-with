/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import TravelRoute from '../api/travel-route/travel-route.model';
import ItineraryItem from '../api/travel-route/itinerary-item.model';
import User from '../api/user/user.model';

User.find({}).remove()
    .then(() => {
        User.create({
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin'
            })
            .then(() => {
                console.log('finished populating users');
            });
    });

var carlo = new User({
    provider: 'local',
    name: 'Carlo',
    email: 'carlo@example.com',
    password: 'carlo'
});

carlo.save();


TravelRoute.find({}).remove()
    .then(() => {
        TravelRoute.create({
            name: "Bangkok's finest",
            itinerary: [
                {
                    name: 'Stopover in BKK',
                    startDate: new Date(2016, 7, 1),
                    endDate: new Date(2016, 7, 11),
                    location: {
                        type: "Point",
                        coordinates: [12.123456, 13.134578]
                    }
                },
                {
                    name: 'Barhopping',
                    startDate: new Date(2016, 7, 11),
                    endDate: new Date(2016, 7, 14),
                    location: {
                        type: "Point",
                        coordinates: [10.123456, 13.134578]
                    }
                }
            ],
            requestor: carlo._id
        })
    });