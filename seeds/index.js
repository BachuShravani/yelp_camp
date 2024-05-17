const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '664724c23ac7d0931b282b18',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus? Incidunt officiis ipsa illum earum facere necessitatibus blanditiis explicabo! Omnis, culpa. Ipsum quod voluptates fuga, enim aliquid libero nostrum ratione.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dhkayeudi/image/upload/v1715939709/YelpCamp/xiqdgiuhctrpnhlojcpj.jpg',
          filename: 'YelpCamp/xiqdgiuhctrpnhlojcpj'
        },
        {
          url: 'https://res.cloudinary.com/dhkayeudi/image/upload/v1714043105/YelpCamp/aarmx5zpo1vgpnhqlove.jpg',
          filename: 'YelpCamp/aarmx5zpo1vgpnhqlove'
        },
        {
          url: 'https://res.cloudinary.com/dhkayeudi/image/upload/v1714043105/YelpCamp/sv7ibdjrp4ib76mqacsj.jpg',
          filename: 'YelpCamp/sv7ibdjrp4ib76mqacsj'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
