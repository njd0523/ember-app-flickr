export default Ember.Route.extend({
    model: function (params) {
        var self = this, method, prev, next, pages, current,
            base_url = 'https://api.flickr.com/services/rest/?',
            api_key = '854f6c3ae2c026056f93eb20036ce07c',
            brand = params['brand-id'],
            page = 1,
            url = base_url + 'method=flickr.photos.search&api_key=' + api_key + '&tags=' +  brand.replace(' ', '+')  + '&safe_search=1&per_page=20&format=json&nojsoncallback=1&page=' + page;

            Ember.$.getJSON(url).then(function (data) {
                var src = '';
                self.store.find('flickr', brand).then(function (flickr) {
                    pages = (parseInt(data.photos.pages, 10) > 200) ? 200 : data.photos.pages;
                    current = (parseInt(data.photos.page, 10) > 200) ? 200 : data.photos.page;
                    prev = (parseInt(current, 10) - 1 === 0) ? 1 : parseInt(current, 10) - 1;
                    next = (parseInt(current, 10) + 1 > parseInt(pages, 10)) ? parseInt(pages, 10) : parseInt(current, 10) + 1;
                    flickr.set('pages', pages);
                    flickr.set('current', current);
                    flickr.set('prev', prev);
                    flickr.set('next', next);
                    if (!flickr.get('imagesCompleted')){
                        $.each(data.photos.photo, function (i, item) {
                            src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                            flickr.get('images').createRecord({id: brand + '_' + i, src: src, brand: brand});
                        });
                        flickr.set('imagesCompleted', true);
                    } else {
                        var org_images = flickr.get('images').get('content');
                        $.each(data.photos.photo, function (i, item) {
                            src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                            org_images[i].set('src', src);
                        });
                    }

                    // IF directly hit the search link
                    if (flickr.get('brands').get('content').length === 0) {
                        method = 'flickr.cameras.getBrandModels';
                        url = base_url + 'method=' + method + '&api_key=' + api_key + '&brand=' + brand + '&format=json&nojsoncallback=1';
                        Ember.$.getJSON(url).then(function (data) {
                            var brand = data.cameras.brand;
                            $.each(data.cameras.camera, function (i, item) {
                                self.store.find('flickr', brand).then(function (flickr) {
                                    flickr.get('brands').createRecord({id: brand + '_' + item.id, title: item.name['_content'], brand: brand});
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

