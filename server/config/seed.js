/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import TravelRoute from '../api/travel-route/travel-route.model';
import ItineraryItem from '../api/travel-route/itinerary-item.model';
import User from '../api/user/user.model';

User.find({}).remove();

var test = new User({
  provider: 'local',
  name: 'Test',
  email: 'test@example.com',
  password: 'test'
});

var admin = new User({
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@example.com',
  password: 'admin'
});

var carlo = new User({
    provider: 'local',
    name: 'Carlo',
    email: 'carlo@example.com',
    password: 'carlo'
});

test.save();
admin.save();
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
            requestor: carlo._id,
          travellers: [test._id]
        })
    }).then(() => {
  TravelRoute.create({
    name: "Italy's finest",
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
    requestor: carlo._id,
    travellers: [admin._id, test._id]
  })
}).then(() => {
  TravelRoute.create({
    name: "Spain's finest",
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
    requestor: admin._id,
    travellers: [carlo._id, test._id]
  })
}).then(() => {
  TravelRoute.create({
    name: "Napoli's finest",
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
    requestor: test._id,
    travellers: [carlo._id, admin._id]
  })
});
