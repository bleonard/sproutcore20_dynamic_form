var App = SC.Application.create({
	selectedTaskType: null,
});

App.TaskField = SC.Object.extend({
	label: null,
	templateName: 'task-field-label',
	tagName: 'p'
});

App.TaskType = SC.Object.extend({
  name: null,
	fields: [],
	
	controller: function() {
		fieldsController = SC.ArrayProxy.create();
		fieldsController.content = this.fields;
		return fieldsController;
	},
	
	selectType: function() {
		App.set('selectedTaskType', this)
  }
});

App.taskTypesController = SC.ArrayProxy.create({
  // Initialize the array controller with the types
  content: [
		
		App.TaskType.create({ name: "Shopping",
			fields: [
								App.TaskField.create({ label: "One" }), 
								App.TaskField.create({ label: "Two" })
							] 
		}), 

		App.TaskType.create({ name: "IKEA",
			fields: [
								App.TaskField.create({ label: "Three" }), 
								App.TaskField.create({ label: "Four" })
							] 
		})
	
	]
});

App.commonFieldsController = SC.ArrayProxy.create({
	content: [
		App.TaskField.create({ label: "Common1" }),
		App.TaskField.create({ label: "Common2" }),
		App.TaskField.create({ label: "Common3" })
	]
});

App.TaskTypeView = SC.Button.extend({
	action: "selectType",	// on the TaskType
	templateName: "task-type-view"
});

App.TaskFieldView = SC.View.extend({
	classNames: ['tr-task-field'],
	field: null,
	
	fieldDelegate: function(prop) {
		var field = this.get('field');
		return field ? field.get(prop) : null;
	},
	
	templateName: function() {
		return this.fieldDelegate('templateName');
  }.property('field').cacheable(),

	tagName: function() {
		return this.fieldDelegate('tagName');
  }.property('field').cacheable()
});

App.SelectedTypeView = SC.View.extend({
  typeBinding: 'App.selectedTaskType',

	fieldsController: function() {
		var type = this.get('type');
		return type ? type.controller() : null;
  }.property('type').cacheable()
});

