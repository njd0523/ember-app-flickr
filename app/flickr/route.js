export default Ember.Route.extend({
    model: function () {
        var self = this,
            base_url = 'https://api.flickr.com/services/rest/?',
            method = 'flickr.cameras.getBrands',
            api_key = '854f6c3ae2c026056f93eb20036ce07c',
            url = base_url + 'method=' + method + '&api_key=' + api_key + '&format=json&nojsoncallback=1';
            
        Ember.$.getJSON(url).then(function (data) {
            $.each(data.brands.brand, function (i, item) {
                self.store.createRecord('flickr', { id: item.id, title: item.name, brandsCompleted: false, imagesCompleted: false, current: 0, pages: 0, prev: 1, next: 1});
            });
        });
        return this.store.find('flickr');
  }
});
