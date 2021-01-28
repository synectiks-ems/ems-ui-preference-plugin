import * as React from 'react';
import { Workflow ,componentType} from '../../Workflow';

class LegalEntityWorkFlow extends React.Component<any, any> {
  workflowRef: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [{"title":"College Info","tabTitle":"College Info","subHeading":"College Info","apiEndPoint":"https://www.google.com","content":[{"id":"LEGAL NAME OF COLLEGE","name":"LEGAL NAME OF COLLEGE","title":"LEGAL NAME OF COLLEGE","isRequired":true,"placeHolder":"please enter the name","errorMessage":"This field is required.","notice":"enter name","validations":[],"type":"text"},{"id":"REGISTERED OFFICE ADDRESS","name":"REGISTERED OFFICE ADDRESS","title":"REGISTERED OFFICE ADDRESS","isRequired":true,"placeHolder":"please enter address","errorMessage":"This field is required.","notice":"enter address","validations":[],"type":"text"},{"id":"DATE OF INCORPORATION","name":"DATE OF INCORPORATION","title":"DATE OF INCORPORATION","isRequired":true,"errorMessage":"This field is required.","notice":"enter date","type":"date"},{"id":"TYPE OF COLLEGE","name":"TYPE OF COLLEGE","title":"TYPE OF COLLEGE","isRequired":true,"options":[{"label":"Private","value":"PRIVATE"},{"label":"Public","value":"PUBLIC"}],"errorMessage":"select Type Of College","notice":"College Type","type":"select"},{"id":"COLLEGE IDENTIFICATION NUMBER","name":"COLLEGE IDENTIFICATION NUMBER","title":"COLLEGE IDENTIFICATION NUMBER","isRequired":true,"placeHolder":"CIN1234567","errorMessage":"This field is required.","notice":"ENTER ID NUMBER","validations":[],"type":"text"}]},
      {"title":"IT Info","tabTitle":"IT Info","subHeading":"IT Info","apiEndPoint":"https://www.google.com","content":[{"id":"PAN","name":"PAN","title":"PAN","isRequired":true,"placeHolder":"ABCDE1234H","errorMessage":"This field is required.","notice":"enter PAN details","validations":[],"type":"text"},{"id":"TAN","name":"TAN","title":"TAN","isRequired":true,"placeHolder":"TASN12345H","errorMessage":"This field is required.","notice":"enter TAN details","validations":[],"type":"text"},{"id":"TAN CIRCLE NUMBER","name":"TAN CIRCLE NUMBER","title":"TAN CIRCLE NUMBER","isRequired":true,"placeHolder":"12345678","errorMessage":"This field is required.","notice":"enter TAN CIRCLE NUMBER","validations":[],"type":"text"},{"id":"FORM 16 SIGNATORY","name":"FORM 16 SIGNATORY","title":"FORM 16 SIGNATORY","isRequired":true,"options":[],"errorMessage":"required","notice":"Select Form Signatory","type":"select"},{"id":"CIT(TDS) LOCATION","name":"CIT(TDS) LOCATION","title":"CIT(TDS) LOCATION","isRequired":true,"placeHolder":"CITY NAME","errorMessage":"This field is required.","notice":"enter location","validations":[],"type":"text"}]},
      {"title":"PF Info","tabTitle":"PF Info","subHeading":"PF Info","apiEndPoint":"https://www.google.com","content":[{"id":"PF NUMBER","name":"PF NUMBER","title":"PF NUMBER","isRequired":true,"placeHolder":"AP/HYD/1234567","errorMessage":"This field is required.","notice":"enter PF Number","validations":[],"type":"text"},{"id":"REGISTRATION DATE","name":"REGISTRATION DATE","title":"REGISTRATION DATE","isRequired":true,"errorMessage":"This field is required.","notice":"ENTER DATE OF REGISTRATION","type":"date"},{"id":"SIGNATORY ","name":"SIGNATORY ","title":"SIGNATORY ","isRequired":true,"options":[],"errorMessage":"Select PF Signatory","notice":"enter PF Signatory","type":"select"},{"id":"SIGNATORY DESIGNATION","name":"SIGNATORY DESIGNATION","title":"SIGNATORY DESIGNATION","isRequired":false,"placeHolder":"enter name","errorMessage":"This field is required.","notice":"enter Designation","validations":[],"type":"text"}]},
      {"title":"ESI Info","tabTitle":"ESI Info","subHeading":"ESI Info","apiEndPoint":"https://www.google.com","content":[{"id":"ESI NUMBER","name":"ESI NUMBER","title":"ESI NUMBER","isRequired":true,"placeHolder":"454876877985465","errorMessage":"This field is required.","notice":"Enter ESI number","validations":[],"type":"text"},{"id":"REGISTRATION DATE","name":"REGISTRATION DATE","title":"REGISTRATION DATE","isRequired":true,"errorMessage":"This field is required.","notice":"enter Date","type":"date"},{"id":"SIGNATORY ","name":"SIGNATORY ","title":"SIGNATORY ","isRequired":true,"options":[],"errorMessage":"Select ESI Signatory","notice":"enter Signatory","type":"select"},{"id":"SIGNATORY DESIGNATION","name":"SIGNATORY DESIGNATION","title":"SIGNATORY DESIGNATION","isRequired":false,"placeHolder":"enter name","errorMessage":"This field is required.","notice":"enter designation","validations":[],"type":"text"}]},
      {"title":"PT Info","tabTitle":"PT Info","subHeading":"PT Info","apiEndPoint":"https://www.google.com","content":[{"id":"PT NUMBER","name":"PT NUMBER","title":"PT NUMBER","isRequired":true,"placeHolder":"4548768779","errorMessage":"This field is required.","notice":"enter PT Number","validations":[],"type":"text"},{"id":"REGISTRATION DATE ","name":"REGISTRATION DATE ","title":"REGISTRATION DATE ","isRequired":true,"errorMessage":"This field is required.","notice":"enter date","type":"date"},{"id":"SIGNATORY","name":"SIGNATORY","title":"SIGNATORY","isRequired":true,"options":[],"errorMessage":"Select PT Signatory","notice":"enter Signatory","type":"select"},{"id":"SIGNATORY DESIGNATION","name":"SIGNATORY DESIGNATION","title":"SIGNATORY DESIGNATION","isRequired":false,"placeHolder":"enter name","errorMessage":"This field is required.","notice":"enter designation","validations":[],"type":"text"}]}]
    };
    this.workflowRef = React.createRef();
  }

  onClickNext = (index: any, tabData: any) => {
    setTimeout(() => {
      this.workflowRef.current.showNextTab();
    }, 3000);
  };

  onFormSubmitted = (step: any, response: any) => {
    console.log(step, response);
  };

  onChangeComponent = (e: any, type: any, tabIndex: any, componentIndex: any) => {
    console.log(e, type, tabIndex, componentIndex);
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Workflow formData={data} onFormSubmitted={this.onFormSubmitted} ref={this.workflowRef} onChangeComponent={this.onChangeComponent} />
      </div>
    );
  }
}

export default LegalEntityWorkFlow;
