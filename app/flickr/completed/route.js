export default Ember.Route.extend({
  model: function(){
    return this.store.filter('flickr', completed);
  },
  renderTemplate: function(controller){
    this.render('flickr/index', { controller: controller });
  }
});

function completed(flickr) {
  return flickr.get('isCompleted');
}
