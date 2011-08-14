var App = SC.Application.create();

App.TaskType = SC.Object.extend({
  name: null
});

App.taskTypesController = SC.ArrayProxy.create({
  // Initialize the array controller with the types
  content: [App.TaskType.create({ name: "Shopping" }), App.TaskType.create({ name: "IKEA" })]
});

App.TaskTypesCollectionView = SC.CollectionView.extend({
  contentBinding: 'App.taskTypesController',
	tagName: 'ul'
});


App.TaskTypeView = SC.View.extend({
	name: null
});