var App = SC.Application.create({
	selectedTaskType: null,
	
	typeName: function() {
    var type = this.get('selectedTaskType');
    if (type != undefined) {
      return type.name;
    } else {
      return "";
    }
  }.property('selectedTaskType').cacheable(),

	typeFieldsController: function() {
    var type = this.get('selectedTaskType');
    if (type != undefined) {
			return type.controller;
    } else {
      return null;
    }
  }.property('selectedTaskType').cacheable()
});

App.TaskField = SC.Object.extend({
	label: null
});

App.TaskType = SC.Object.extend({
  name: null,
	controller: SC.ArrayProxy.create({
	  content: [App.TaskField.create({ label: "One" }), App.TaskField.create({ label: "Two" })]
	}),

	selectType: function() {
		App.set('selectedTaskType', this)
  }
});

App.taskTypesController = SC.ArrayProxy.create({
  // Initialize the array controller with the types
  content: [App.TaskType.create({ name: "Shopping" }), App.TaskType.create({ name: "IKEA" })]
});

App.TaskTypeView = SC.Button.extend({
	action: "selectType",	// on the TaskType
	templateName: "task-type-view"
});

App.HeaderView = SC.View.extend({
  typeNameBinding: 'App.typeName'
});


App.TaskFieldView = SC.View.extend({
	classNames: ['tr-task-field'],
	tagName: "div",
	field: null
});
