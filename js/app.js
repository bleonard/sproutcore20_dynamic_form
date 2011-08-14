var App = SC.Application.create({
	selectedTaskType: null,
	
	typeName: function() {
    var type = this.get('selectedTaskType');
    if (type != undefined) {
      return type.name;
    } else {
      return "";
    }
  }.property('selectedTaskType').cacheable()
});

App.TaskType = SC.Object.extend({
  name: null,

	selectType: function() {
		App.set('selectedTaskType', this)
  }
});

App.taskTypesController = SC.ArrayProxy.create({
  // Initialize the array controller with the types
  content: [App.TaskType.create({ name: "Shopping" }), App.TaskType.create({ name: "IKEA" })]
});

App.TaskTypesCollectionView = SC.CollectionView.extend({
  contentBinding: 'App.taskTypesController',
	tagName: 'ul'
});


App.TaskTypeView = SC.Button.extend({
	action: "selectType"	// on the TaskType
});

App.HeaderView = SC.View.extend({
  typeNameBinding: 'App.typeName'
});
