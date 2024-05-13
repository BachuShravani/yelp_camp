const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// 'https://res.cloudinary.com/dhkayeudi/image/upload/v1714152133/YelpCamp/iybgvah7wrwgl3kojuvg.jpg',
const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = {toJSON: {virtuals:true}};

const campgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
  // return "<a href=\" " + "/campgrounds/" + this._id + " \">" + this.title + "</a>";
  return `<a href='/campgrounds/${this._id}'>${this.title}</a>`

});


campgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    });
  }
});

module.exports = mongoose.model('Campground', campgroundSchema);



// const campground = '{
//   "geometry":{
//     "type":"Point",
//     "coordinates":[-80.1625463,25.9331488]
//   },
//     "_id":"664259fa24b10a40a72b8334",
//     "title":"Maple Hunting Camp",
//     "images":[
//       {"url":"https://res.cloudinary.com/dhkayeudi/image/upload/v1714043105/YelpCamp/cvgla43ggjd9q4fyjsjz.jpg",
//     "filename":"YelpCamp/cvgla43ggjd9q4fyjsjz",
//     "_id":"664259fa24b10a40a72b8335"},
//     {"url":"https://res.cloudinary.com/dhkayeudi/image/upload/v1714043105/YelpCamp/aarmx5zpo1vgpnhqlove.jpg","filename":"YelpCamp/aarmx5zpo1vgpnhqlove","_id":"664259fa24b10a40a72b8336"},
//     {"url":"https://res.cloudinary.com/dhkayeudi/image/upload/v1714043105/YelpCamp/sv7ibdjrp4ib76mqacsj.jpg","filename":"YelpCamp/sv7ibdjrp4ib76mqacsj","_id":"664259fa24b10a40a72b8337"}],
//     "price":17,
//     "description":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus? Incidunt officiis ipsa illum earum facere necessitatibus blanditiis explicabo! Omnis, culpa. Ipsum quod voluptates fuga, enim aliquid libero nostrum ratione.",
//     "location":"North Miami Beach, Florida",
//     "author":{"_id":"664256d7b8772449fbf9b9fe","email":"shravani17695@gmail.com","username":"shravani","__v":0},
//     "reviews":[],
//     "__v":0,
//     "properties":{
//       "popUpMarkup":"<a href='/campgrounds/664259fa24b10a40a72b8334'>Maple Hunting Camp</a>"
//     },
//     "id":"664259fa24b10a40a72b8334"}';
