export default Ember.Route.extend({
  model: function(params){
    var self = this,
        base_url = 'https://api.flickr.com/services/rest/?',
        method = 'flickr.cameras.getBrandModels',
        api_key = '854f6c3ae2c026056f93eb20036ce07c',
        url = base_url + 'method=' + method + '&api_key=' + api_key + '&brand=' + params['brand-id'] + '&format=json&nojsoncallback=1';

    Ember.$.getJSON(url).then(function (data) {
        var brand = data.cameras.brand;
        $.each(data.cameras.camera, function (i, item) {
            self.store.find('flickr', brand).then(function (flickr) {
                flickr.get('brands').createRecord({id: item.id, title: item.name['_content'], brand: brand});
            });
        });
    });
    return this.store.find('flickr');
  },
  renderTemplate: function(controller){
    this.render('flickr/index', {controller: controller});
  }
});

function active(flickr) {
  return !flickr.get('isCompleted');
}
