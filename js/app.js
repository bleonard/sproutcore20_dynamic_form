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
			return type.controller();
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

App.HeaderView = SC.View.extend({
  typeNameBinding: 'App.typeName'
});


App.TaskFieldView = SC.View.extend({
	classNames: ['tr-task-field'],
	tagName: "div",
	field: null
});
