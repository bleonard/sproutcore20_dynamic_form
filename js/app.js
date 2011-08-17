var App = SC.Application.create({
	task: SC.Object.create({
		type: null
	})
});

App.TaskField = SC.Object.extend({
	id: null,
	label: null,
	tagName: 'div',
	type: null,
	
	templateName: function() {
		switch (this.get('type')) {
			case "TaskStringField":
				return 'task-string-field';
			case "TaskTextField":
				return 'task-text-field';
			case "TaskBooleanField":
				return 'task-boolean-field';
			default:
				return 'task-field-label';
		}
	}.property('type').cacheable()
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
		App.task.set('type', this)
  }
});

App.taskTypesController = SC.ArrayProxy.create({
  // Initialize the array controller with the types
  content: [
		
		App.TaskType.create({ name: "Shopping",
			fields: [
								App.TaskField.create({ id: 4, label: "One", type: "TaskStringField" }), 
								App.TaskField.create({ id: 5, label: "Two", type: "TaskBooleanField" })
							] 
		}), 

		App.TaskType.create({ name: "IKEA",
			fields: [
								App.TaskField.create({ id: 6, label: "Three" }), 
								App.TaskField.create({ id: 7, label: "Four", type: "TaskTextField" })
							] 
		})
	
	]
});

App.commonFieldsController = SC.ArrayProxy.create({
	content: [
		App.TaskField.create({ id: 1, label: "Common1" }),
		App.TaskField.create({ id: 2, label: "Common2" }),
		App.TaskField.create({ id: 3, label: "Common3" })
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
  typeBinding: 'App.task.type',

	fieldsController: function() {
		var type = this.get('type');
		return type ? type.controller() : null;
  }.property('type').cacheable()
});

