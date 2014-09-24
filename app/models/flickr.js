// models/flickr.js
var Flickr = DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  brands: DS.hasMany('brands'),
  images: DS.hasMany('brands'),
  brandsCompleted: DS.attr('boolean'),
  imagesCompleted: DS.attr('boolean'),
  pages: DS.attr('number'),
  current: DS.attr('number'),
  prev: DS.attr('number'),
  next: DS.attr('number')
});

Flickr.FIXTURES = [];
export default Flickr;
