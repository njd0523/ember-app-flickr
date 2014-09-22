export default Ember.Route.extend({
  model: function(){
    return this.store.filter('flickr', active);
  },
  renderTemplate: function(controller){
    this.render('flickr/index', {controller: controller});
  }
});

function active(flickr) {
  return !flickr.get('isCompleted');
}
