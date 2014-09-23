var Router = Ember.Router.extend();

Router.map(function(){
  this.resource('flickr', { path: '/brands/' }, function() {
    this.route('active', { path: '/:brand-id/' });
    this.route('search', { path: '/:brand-id/search' });
    this.route('completed', { path: '/:brand-id/search/:page' });
  });
});

export default Router;
