export default Ember.Route.extend({
    model: function (params) {
        var self = this, method,
            base_url = 'https://api.flickr.com/services/rest/?',
            api_key = '854f6c3ae2c026056f93eb20036ce07c',
            query = params['brand-id'],
            url = base_url + 'method=flickr.photos.search&api_key=' + api_key + '&tags=' +  query.replace(' ', '+')  + '&safe_search=1&per_page=40&format=json&jsoncallback=?';

            Ember.$.getJSON(url).then(function (data) {
                var brand = query, src = '';
                self.store.find('flickr', brand).then(function (flickr) {

                    $.each(data.photos.photo, function (i, item) {
                        src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                        flickr.get('images').createRecord({id: i, src: src, brand: brand});
                    });

                    // IF directly hit the search link
                    if (flickr.get('brands').get('content').length === 0) {
                        method = 'flickr.cameras.getBrandModels',
                        url = base_url + 'method=' + method + '&api_key=' + api_key + '&brand=' + params['brand-id'] + '&format=json&nojsoncallback=1';
                        Ember.$.getJSON(url).then(function (data) {
                            var brand = data.cameras.brand;
                            $.each(data.cameras.camera, function (i, item) {
                                self.store.find('flickr', brand).then(function (flickr) {
                                    flickr.get('brands').createRecord({id: item.id, title: item.name['_content'], brand: brand});
                                });
                            });
                        });
                    }

                });
            });

        return this.store.find('flickr');
  },
  renderTemplate: function(controller){
    this.render('flickr/index', { controller: controller });
  }
});

