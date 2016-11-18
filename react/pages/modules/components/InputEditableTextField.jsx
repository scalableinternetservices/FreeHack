// InputEditableTextField.jsx

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Glyphicon = require('react-bootstrap').Glyphicon;

/**
*  Show current saved value for a text field and let user update the field and submit changes
*
*  note: this element should be wrapped in a form tag for proper display
*    <form className="form-horizontal">...<InputEditableTextField />...</form
*
*  @prop title: field being edited: 'Title'
*  @prop placeholder: placeholder to show in field
*  @prop buttonTitle: title for action button
*  @prop currentValue: current saved value of the field: 'Some Show'
*  @prop multiline: should allow user to enter multiple lines of text
*  @prop onSubmit -> function(text): parent's function to be called if 'Submit' is hit
*  @prop verified: should show indicator that the value was successfully... whatever
*
*  @state value: current value being entered
*  @state editable: should let the user edit the field
*  @state currentlyEditing: user has begun editing the text field by typing at least 1 character (used to select text on first edit)
*/
var InputEditableTextField = React.createClass({
  getInitialState: function() {
    return {
        value: this.props.value,
        editable: false,
        currentlyEditing: false
    };
  },
  handleChange: function(e) {
    this.setState({value: e.target.value, currentlyEditing: false});
  },
  toggleEditableField: function(e) {
    var shouldEdit = !this.state.editable;
    this.setState({value: this.props.currentValue, editable: shouldEdit, currentlyEditing: true});
    if (shouldEdit) {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.textInput).focus(); 
        }, 100);
    }
  },
  handleSubmit: function() {
    this.props.onSubmit(this.state.value);
    this.setState({value: '', editable: false});
  },
  handleEnter: function(e) {
    e.preventDefault();
    this.handleSubmit(); 
  },
  render: function() {
    return (
      <div className="inputEditableTextField">
        <Form inline style={{clear: "both"}} onSubmit={this.handleEnter}>
            <FormGroup style={{margin: "5px 10px 0 0"}}>
                <ControlLabel>
                    {this.props.title}
                </ControlLabel>
            </FormGroup>
            <FormGroup style={{margin: "5px auto 0 auto"}}>
                {this.state.editable ?
                <FormControl type="text" ref={function(input){console.log('focusing', input);this.textInput = input}}
                    onChange={this.handleChange} placeholder={this.props.placeholder} />
                :
                <ControlLabel style={{color: "grey"}}>
                    {this.props.currentValue}&emsp;
                    { this.props.verified ?
                    <Glyphicon />
                    :
                    null
                    }
                </ControlLabel>
                }
            </FormGroup>
            <FormGroup style={{float: "right", margin: "5px auto"}}>
                <a onClick={this.state.editable ? this.handleSubmit : this.toggleEditableField}>
                    {this.state.editable ? "Submit" : "Edit"}
                </a>
                {this.state.editable ?
                <a style={{paddingLeft: "10px"}} onClick={this.toggleEditableField}>
                Cancel
                </a>
                : null}
            </FormGroup>
        </Form>
      </div>
    );
  }
});


module.exports = InputEditableTextField;
