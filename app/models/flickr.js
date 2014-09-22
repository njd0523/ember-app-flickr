// models/flickr.js
var Flickr = DS.Model.extend({
  name: DS.attr('string'),
  title: DS.attr('string')
});

Flickr.FIXTURES = [];
export default Flickr;
