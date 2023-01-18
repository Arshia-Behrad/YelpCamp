const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log('Mongoose Connected')
  })
  .catch(err => {
    console.log(err)
  });



const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // My User ID
      author: '63b1ed979784fc4a9f651a35',
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum quo doloribus autem quaerat. Voluptatum, nesciunt neque ipsam voluptate quia saepe dicta officia minima nemo tempora iure at doloribus! Sed, voluptate?',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[randomNum].longitude,
          cities[randomNum].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dkc9qye1c/image/upload/v1673272149/YelpCamp/xye9vjbergtzvyxubmq6.jpg',
          filename: 'YelpCamp/xye9vjbergtzvyxubmq6',
        },
        {
          url: 'https://res.cloudinary.com/dkc9qye1c/image/upload/v1673272184/YelpCamp/kplicucuj0qlhblnlpiu.jpg',
          filename: 'YelpCamp/kplicucuj0qlhblnlpiu',
        },
        {
          url: 'https://res.cloudinary.com/dkc9qye1c/image/upload/v1673272153/YelpCamp/de6zefwzheozbtzuiicq.jpg',
          filename: 'YelpCamp/de6zefwzheozbtzuiicq',
        }
      ]
    })
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

