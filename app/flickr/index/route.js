export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('flickr');
    //return this.modelFor('flickr');
  }
});
