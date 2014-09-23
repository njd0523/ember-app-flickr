// models/flickr.js
var Flickr = DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string'),
  brands: DS.hasMany('brands'),
  images: DS.hasMany('brands')
});

Flickr.FIXTURES = [];
export default Flickr;
