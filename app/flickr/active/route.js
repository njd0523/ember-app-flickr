export default Ember.Route.extend({
  model: function(params){
    var self = this,
        base_url = 'https://api.flickr.com/services/rest/?',
        method = 'flickr.cameras.getBrandModels',
        api_key = '854f6c3ae2c026056f93eb20036ce07c',
        brand = params['brand-id'],
        url = base_url + 'method=' + method + '&api_key=' + api_key + '&brand=' + brand + '&format=json&nojsoncallback=1';
    
        if (this.currentModel) {
            self.store.find('flickr', self.temp).then(function (flickr) {
                if (flickr.get('brandsCompleted')){
                    flickr.set('brandsCompleted', false);
                }
                
                flickr.get('brands').get('content').clear();
                
                if (flickr.get('images').get('content').length > 0){
                    flickr.get('images').get('content').clear();
                    flickr.set('current', 0);
                }
            });
        }
        self.temp = brand;

        Ember.$.getJSON(url).then(function (data) {
            self.store.find('flickr', brand).then(function (flickr) {
                if (!flickr.get('brandsCompleted')) {
                    $.each(data.cameras.camera, function (i, item) {
                        flickr.get('brands').createRecord({id: brand + '_' + item.id, title: item.name['_content'], brand: brand});
                    });
                    flickr.set('brandsCompleted', true);
                }
            });
        });
    return this.store.find('flickr');
  },
  renderTemplate: function(controller){
    this.render('flickr/index', {controller: controller});
  }
});
