var isEmpty  = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ArrayController.extend({
  active:    filterBy('@this', 'isCompleted', false),
  completed: filterBy('@this', 'isCompleted', true),
  hasCompleted: notEmpty('completed.[]'),

  inflection: function () {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }.property('active.[]'),

  allAreDone: function (key, value) {
    if (arguments.length === 2) {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    } else {
      return !isEmpty(this) && this.get('length') === this.get('completed.length');
    }
  }.property('@each.isCompleted'),

  actions: {
    createTodo: function () {
      // Get the flickr title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (title && !title.trim()) { 
        this.set('newTitle', ''); 
        return; 
      }

      // Create the new Todo model
      var flickr = this.store.createRecord('flickr', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      flickr.save();
    },

    clearCompleted: function () {
      var completed = this.get('completed');

      completed.toArray(). // clone the array, so it is not bound while we iterate over and delete.
        invoke('deleteRecord').
        invoke('save');
    }
  }
});
