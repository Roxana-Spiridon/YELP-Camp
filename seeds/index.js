const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]; // returneza un numar random in functie de lungimea array-ului

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60645b795043373890ba833b', //user ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate reprehenderit quia pariatur sunt, ex excepturi voluptatem quisquam autem incidunt quidem eius quo, repellendus sequi voluptates nemo corrupti! Nobis, mollitia.',
            price,
            images: [{
                    url: 'https://res.cloudinary.com/dvxey3pp2/image/upload/v1617708286/YelpCamp/zogwnuncqmibgmg6ijby.jpg',
                    filename: 'YelpCamp/zogwnuncqmibgmg6ijby'
                },
                {
                    url: 'https://res.cloudinary.com/dvxey3pp2/image/upload/v1617708287/YelpCamp/foarieyhdpbr5nnraj6r.jpg',
                    filename: 'YelpCamp/foarieyhdpbr5nnraj6r'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});