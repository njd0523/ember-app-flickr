export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
    this.$().addClass('focus');
  }
});
