import * as React from 'react';
import { Workflow ,componentType} from '../../Workflow';

class StaffWorkFlow extends React.Component<any, any> {
  workflowRef: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [{"title":"Personal Details","tabTitle":"Personal Details","subHeading":"Staff Personal Details","content":[{"id":"teacherName","name":"teacherName","title":"Name","isRequired":true,"placeHolder":"enter name","errorMessage":"This field is required.","notice":"name","validations":[],"type":"text"},{"id":"teacherMiddleName","name":"teacherMiddleName","title":"Middle Name","isRequired":false,"placeHolder":"enter middle name","errorMessage":"This field is required.","notice":"middle name","validations":[],"type":"text"},{"id":"teacherLastName","name":"teacherLastName","title":"Last Name","isRequired":true,"placeHolder":"enter last name","errorMessage":"This field is required.","notice":"last name","validations":[],"type":"text"},{"id":"fatherName","name":"fatherName","title":"Father Name","isRequired":true,"placeHolder":"enter father name","errorMessage":"This field is required.","notice":"enter father name","validations":[],"type":"text"},{"id":"fatherMiddleName","name":"fatherMiddleName","title":"Father Middle Name","isRequired":false,"placeHolder":"enter middlename","errorMessage":"This field is required.","notice":"middle name","validations":[],"type":"text"},{"id":"fatherLastName","name":"fatherLastName","title":"Father Last Name","isRequired":true,"placeHolder":"enter last name","errorMessage":"This field is required.","notice":"Last Name","validations":[],"type":"text"},{"id":"spouseName","name":"spouseName","title":"Spouse Name","isRequired":false,"placeHolder":"enter Spouse Name","errorMessage":"This field is required.","notice":"enter Spouse Name","validations":[],"type":"text"},{"id":"spouseMiddleName","name":"spouseMiddleName","title":"Spouse Middle Name","isRequired":false,"placeHolder":"enter Spouse Middle Name","errorMessage":"This field is required.","notice":"enter middle name","validations":[],"type":"text"},{"id":"spouseLastName","name":"spouseLastName","title":"Spouse Last Name","isRequired":false,"placeHolder":"enter Spouse Last Name","errorMessage":"This field is required.","notice":"enter the last name","validations":[],"type":"text"},{"id":"motherName","name":"motherName","title":"Mother Name","isRequired":false,"placeHolder":"enter Mother Name","errorMessage":"This field is required.","notice":"enter Mother Name","validations":[],"type":"text"},{"id":"motherMiddleName","name":"motherMiddleName","title":"Mother Middle Name","isRequired":false,"placeHolder":"enter Mother Middle Name","errorMessage":"This field is required.","notice":"enter Mother Middle Name","validations":[],"type":"text"},{"id":"motherLastName","name":"motherLastName","title":"Mother Last Name","isRequired":false,"placeHolder":"enter Mother Last Name","errorMessage":"This field is required.","notice":"enter Mother Last Name","validations":[],"type":"text"},{"id":"dateOfBirth","name":"dateOfBirth","title":"Date Of Birth","isRequired":true,"errorMessage":"This field is required.","notice":"enter date","type":"date"},{"id":"placeOfBirth","name":"placeOfBirth","title":"Place Of Birth","isRequired":false,"placeHolder":"enter Birth Place","errorMessage":"This field is required.","notice":"enter Place Of Birth","validations":[],"type":"text"},{"id":"religion","name":"religion","title":"Religion","isRequired":true,"options":[{"label":"Hindu","value":"HINDU"},{"label":"Muslim","value":"MUSLIM"},{"label":"Sikh","value":"SIKH"},{"label":"Christian","value":"CHRISTIAN"},{"label":"Budh","value":"BUDH"},{"label":"Parsian","value":"PARSIAN"}],"errorMessage":"Select Religion","notice":"enter Religion","type":"select"},{"id":"caste","name":"caste","title":"Caste","isRequired":false,"options":[{"label":"GENERAL","value":"GENERAL"},{"label":"SCHEDULED CASTES","value":"SCHEDULED CASTES"},{"label":"SCHEDULED TRIBES","value":"SCHEDULED TRIBES"},{"label":"OTHER BACKWARD CLASSES","value":"OTHER BACKWARDCLASSES"}],"errorMessage":"Select Caste","notice":"enter Caste","type":"select"},{"id":"subCaste","name":"subCaste","title":"Sub Caste","isRequired":false,"placeHolder":"enter sub caste","errorMessage":"This field is required.","notice":"enter Sub Caste","validations":[],"type":"text"},{"id":"sex","name":"sex","title":"Gender","isRequired":true,"options":[{"label":"Male","value":"MALE"},{"label":"Female","value":"FEMALE"},{"label":"Both","value":"BOTH"}],"errorMessage":"Select Gender","notice":"enter Gender","type":"select"},{"id":"aadharNo","name":"aadharNo","title":"Adhar No","isRequired":false,"placeHolder":"enter AADHAR","errorMessage":"This field is required.","notice":"enter Aadhar No","validations":[],"type":"text"},{"id":"panNo","name":"panNo","title":"PAN No","isRequired":false,"placeHolder":"enter PAN ","errorMessage":"This field is required.","notice":"enter PAN no","validations":[],"type":"text"}]},
      {"title":"Contact Details","tabTitle":"Contact Details","subHeading":"Staff Contact Details","content":[{"id":"address ","name":"address ","title":"Address ","isRequired":true,"placeHolder":"enter address","errorMessage":"This field is required.","notice":"enter Address","validations":[],"type":"text"},{"id":"city","name":"city","title":"City","isRequired":false,"placeHolder":"enter city","errorMessage":"This field is required.","notice":"enter City","validations":[],"type":"text"},{"id":"state","name":"state","title":"State","isRequired":false,"placeHolder":"enter state","errorMessage":"This field is required.","notice":"enter State","validations":[],"type":"text"},{"id":"country","name":"country","title":"Country","isRequired":false,"placeHolder":"enter Country","errorMessage":"This field is required.","notice":"enter Country","validations":[],"type":"text"},{"id":"pinCode","name":"pinCode","title":"Pin Code","isRequired":false,"placeHolder":"enter PIN CODE","errorMessage":"This field is required.","notice":"enter PIN","validations":[],"type":"text"},{"id":"teacherContactNumber","name":"teacherContactNumber","title":"Contact Number","isRequired":true,"placeHolder":"enter contact no","errorMessage":"This field is required.","notice":"enter contact no","validations":[],"type":"text"},{"id":"alternateContactNumber","name":"alternateContactNumber","title":"Alternate Contact Number","isRequired":false,"placeHolder":"enter Alternate Contact Number","errorMessage":"This field is required.","notice":"enter details","validations":[],"type":"text"},{"id":"teacherEmailAddress","name":"teacherEmailAddress","title":"Email Address","isRequired":true,"placeHolder":"enter Email Address","errorMessage":"This field is required.","notice":"enter email","validations":[],"type":"text"},{"id":"alternateEmailAddress","name":"alternateEmailAddress","title":"Alternate Email Address","isRequired":false,"placeHolder":"enter Alternate Email Address","errorMessage":"This field is required.","notice":"enter email","validations":[],"type":"text"}]},
      {"title":"Emergency Contact","tabTitle":"Emergency Contact","subHeading":"Emergency Contact","content":[{"id":"relationWithStaff","name":"relationWithStaff","title":"Relation with Staff","isRequired":true,"options":[{"label":"Father","value":"FATHER"},{"label":"Mother","value":"MOTHER"},{"label":"Guardian","value":"GUARDIAN"}],"errorMessage":"Select Relation","notice":"enter Relation with Staff","type":"select"},{"id":"emergencyContactName","name":"emergencyContactName","title":"Name","isRequired":true,"placeHolder":"enter name","errorMessage":"This field is required.","notice":"enter Name","validations":[],"type":"text"},{"id":"emergencyContactMiddleName","name":"emergencyContactMiddleName","title":"Middle Name","isRequired":false,"placeHolder":"enter middle name","errorMessage":"This field is required.","notice":"enter Middle Name","validations":[],"type":"text"},{"id":"emergencyContactLastName","name":"emergencyContactLastName","title":"Last Name","isRequired":true,"placeHolder":"enter last name","errorMessage":"This field is required.","notice":"enter the last name","validations":[],"type":"text"},{"id":"emergencyContactNo","name":"emergencyContactNo","title":"Contact Number","isRequired":true,"placeHolder":"enter contact number","errorMessage":"This field is required.","notice":"enter Contact Number","validations":[],"type":"text"},{"id":"emergencyContactEmailAddress","name":"emergencyContactEmailAddress","title":"Email Address","isRequired":false,"placeHolder":"enter email","errorMessage":"This field is required.","notice":"enter email","validations":[],"type":"text"}]}]
    };
    this.workflowRef = React.createRef();
  }

  onClickNext = (index: any, tabData: any) => {
    setTimeout(() => {
      this.workflowRef.current.showNextTab();
    }, 3000);
  };

  onFormSubmitted = (step: any, response: any) => {
    // console.log(step, response);
  };

  onChangeComponent = (e: any, type: any, tabIndex: any, componentIndex: any) => {
    // console.log(e, type, tabIndex, componentIndex);
  }

  onChangeTab = (activeTab: any, data: any) => {
    if (activeTab === this.state.data.length - 1) {
      this.props.sendData(data);
    } else {
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

export default StaffWorkFlow;
