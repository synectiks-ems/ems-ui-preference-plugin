import * as React from 'react';
import { Workflow, componentType } from '../../Workflow';

class LegalEntityWorkFlow extends React.Component<any, any> {
  workflowRef: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        {
          "title": "College Info", "tabTitle": "College Info", "subHeading": "College Info",
          "content": [{
            "id": "legalNameOfCollege", "name": "legalNameOfCollege", "title": "LEGAL NAME OF COLLEGE", "isRequired": true, "placeHolder": "please enter the name", "errorMessage": "This field is required.", "notice": "enter name", "validations": [], "type": "text"
          }, {
            "id": "registeredOfficeAddress", "name": "registeredOfficeAddress", "title": "REGISTERED OFFICE ADDRESS", "isRequired": true, "placeHolder": "please enter address", "errorMessage": "This field is required.", "notice": "enter address", "validations": [], "type": "text"
          },
          { "id": "dateOfIncorporation", "name": "dateOfIncorporation", "title": "DATE OF INCORPORATION", "isRequired": true, "errorMessage": "This field is required.", "notice": "enter date", "type": "date" },
          { "id": "typeOfCollege", "name": "typeOfCollege", "title": "TYPE OF COLLEGE", "isRequired": true, "options": [{ "label": "Private", "value": "PRIVATE" }, { "label": "Public", "value": "PUBLIC" }], "errorMessage": "select Type Of College", "notice": "College Type", "type": "select" },
          { "id": "collegeIdentificationNumber", "name": "collegeIdentificationNumber", "title": "COLLEGE IDENTIFICATION NUMBER", "isRequired": true, "placeHolder": "CIN1234567", "errorMessage": "This field is required.", "notice": "ENTER ID NUMBER", "validations": [], "type": "text" }]
        },
        {
          "title": "IT Info", "tabTitle": "IT Info", "subHeading": "IT Info",
          "content": [
            {
              "id": "pan", "name": "pan", "title": "PAN", "isRequired": true, "placeHolder": "ABCDE1234H", "errorMessage": "This field is required.", "notice": "enter PAN details", "validations": [], "type": "text"
            },
            { "id": "tan", "name": "tan", "title": "TAN", "isRequired": true, "placeHolder": "TASN12345H", "errorMessage": "This field is required.", "notice": "enter TAN details", "validations": [], "type": "text" },
            { "id": "tanCircleNumber", "name": "tanCircleNumber", "title": "TAN CIRCLE NUMBER", "isRequired": true, "placeHolder": "12345678", "errorMessage": "This field is required.", "notice": "enter TAN CIRCLE NUMBER", "validations": [], "type": "text" },
            { "id": "formSignatory", "name": "formSignatory", "title": "FORM 16 SIGNATORY", "isRequired": false, "options": [], "errorMessage": "required", "notice": "Select Form Signatory", "type": "select" },
            { "id": "citTdsLocation", "name": "citTdsLocation", "title": "CIT(TDS) LOCATION", "isRequired": true, "placeHolder": "CITY NAME", "errorMessage": "This field is required.", "notice": "enter location", "validations": [], "type": "text" },
          ]
        },
        {
          "title": "PF Info", "tabTitle": "PF Info", "subHeading": "PF Info",
          "content": [{
            "id": "pfNumber", "name": "pfNumber", "title": "PF NUMBER", "isRequired": true, "placeHolder": "AP/HYD/1234567", "errorMessage": "This field is required.", "notice": "enter PF Number", "validations": [], "type": "text"
          },
          { "id": "pfRegistrationDate", "name": "pfRegistrationDate", "title": "REGISTRATION DATE", "isRequired": true, "errorMessage": "This field is required.", "notice": "ENTER DATE OF REGISTRATION", "type": "date" },
          { "id": "pfSignatory ", "name": "pfSignatory ", "title": "SIGNATORY ", "isRequired": false, "options": [], "errorMessage": "Select PF Signatory", "notice": "enter PF Signatory", "type": "select" },
          { "id": "pfSignatoryDesignation", "name": "pfSignatoryDesignation", "title": "SIGNATORY DESIGNATION", "isRequired": false, "placeHolder": "enter name", "errorMessage": "This field is required.", "notice": "enter Designation", "validations": [], "type": "text" }]
        },
        {
          "title": "ESI Info", "tabTitle": "ESI Info", "subHeading": "ESI Info",
          "content": [{
            "id": "esiNumber", "name": "esiNumber", "title": "ESI NUMBER", "isRequired": true, "placeHolder": "454876877985465", "errorMessage": "This field is required.", "notice": "Enter ESI number", "validations": [], "type": "text"
          },
          { "id": "esiRegistrationDate", "name": "esiRegistrationDate", "title": "REGISTRATION DATE", "isRequired": true, "errorMessage": "This field is required.", "notice": "enter Date", "type": "date" },
          { "id": "esiSignatory ", "name": "esiSignatory ", "title": "SIGNATORY ", "isRequired": false, "options": [], "errorMessage": "Select ESI Signatory", "notice": "enter Signatory", "type": "select" },
          { "id": "esiSignatoryDesignation", "name": "esiSignatoryDesignation", "title": "SIGNATORY DESIGNATION", "isRequired": false, "placeHolder": "enter name", "errorMessage": "This field is required.", "notice": "enter designation", "validations": [], "type": "text" }]
        },
        {
          "title": "PT Info", "tabTitle": "PT Info", "subHeading": "PT Info",
          "content": [{
            "id": "ptNumber", "name": "ptNumber", "title": "PT NUMBER", "isRequired": true, "placeHolder": "4548768779", "errorMessage": "This field is required.", "notice": "enter PT Number", "validations": [], "type": "text"
          },
          { "id": "ptRegistrationDate ", "name": "ptRegistrationDate", "title": "REGISTRATION DATE ", "isRequired": true, "errorMessage": "This field is required.", "notice": "enter date", "type": "date" },
          { "id": "ptSignatory", "name": "ptSignatory", "title": "SIGNATORY", "isRequired": false, "options": [], "errorMessage": "Select PT Signatory", "notice": "enter Signatory", "type": "select" },
          { "id": "ptSignatorydesignation", "name": "ptSignatorydesignation", "title": "SIGNATORY DESIGNATION", "isRequired": false, "placeHolder": "enter name", "errorMessage": "This field is required.", "notice": "enter designation", "validations": [], "type": "text" }]
        }]
    };
    this.workflowRef = React.createRef();
  }

  onClickNext = (index: any, tabData: any) => {
    setTimeout(() => {
      this.workflowRef.current.showNextTab();
    }, 3000);
  };

  componentDidMount() {
    //make api call here
    setTimeout(() => {
      this.setFormSignatory();
    }, 1000);
  }

  setFormSignatory = () => {
    let options = [{
      "value": "abc",
      "label": "ABC"
    },
    {
      "value": "def",
      "label": "DEF"
    },
    {
      "value": "xyz",
      "label": "XYZ"
    }];
    const { data } = this.state;
    data[1].content[3].options = options;
    this.setState({
      data,
    })
  }


  onFormSubmitted = (step: any, response: any) => {
    console.log(step, response);
  };

  onChangeComponent = (e: any, type: any, tabIndex: any, componentIndex: any) => {
    console.log(e, type, tabIndex, componentIndex);
  }
  onChangeTab = (activeTab: any, data: any) => {
    if (activeTab === this.state.data.length - 1) {
      this.props.sendData(data);
    }
    else {
      this.workflowRef.current.showNextTab();
    }
  };

  onSuccessfulCall = () => {
    this.workflowRef.current.onSuccessfulCall();
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Workflow formData={data} onFormSubmitted={this.onFormSubmitted} ref={this.workflowRef} onChangeComponent={this.onChangeComponent} onChangeTab={this.onChangeTab} />
      </div>
    );
  }
}

export default LegalEntityWorkFlow;
