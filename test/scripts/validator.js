define(['jquery','DataPopulator', 'events'], function($,DataPopulator, events){
	var Validator = compose(events, {
		rules: {
			alphanumeric: function($textField){

				return !!$textField.val().match(/^[a-zA-Z\d\s]+$/);
			},
			checkbox: function($checkbox){
				return $checkbox.prop('checked');
			},
			radio: function($radio){
				var anyCheckBoxChecked = false;
				$radio.each(function(){
					if($(this).prop('checked') === true){
						anyCheckBoxChecked =  true;
						return false;
					}
				});

				return anyCheckBoxChecked;
			},
			select: function($select){

				return $select.val().length;
			}
		},
		
		initialise: function(form){
			this.$form = $(form);
			this.$questions = this.$form.find('div.question');
			this.$form.$submitBtn = this.$form.find("input[type=submit]");
			this.bindEvents();
		},

		bindEvents: function(){

			var self = this;

			this.$form.$submitBtn.click(function(e){
				e.preventDefault();
				self.evaluateForm();
			});
		},

		validateForm: function(){
			var rules = this.rules,
				fieldsWithErrors = new Object(),
				allValid = true;

			this.$questions.each(function(i){
				var	$question = $(this),
					type = $question.data('validationType'),
					$field = $question.find("input,select"),
					$errorField = $question.find(".error"),
					valid = rules[type]($field);

				if(valid){
					//remove the error if already showing
					$errorField.hide();
				}else{
					$errorField.show();
					allValid = false;
				}
				
			});

			return allValid;
		},
		
		evaluateForm: function(){
			var isFormValid = this.validateForm();

			this.trigger('validate', isFormValid);
		},
	});

	

	//returning the constructor

	//we return Validator as a constructor, not an object and not a function 
	//because we want to instantiate the object only when we need it 
	//and call necessary functions when we need them
	//we don't want to instantiate the object by default in each module
	return Validator;
})
