import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import  "../../../../css/custom.css";
import {MessageBox} from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { SAVE_ACADEMIC_YEAR, GET_ACADEMIC_YEAR_LIST } from '../../_queries';
import * as moment from 'moment';
import Table from '../../../../css/table';
import wsCmsBackendServiceSingletonClient from '../../../../wsCmsBackendServiceClient';


export interface AcademicYearProps extends React.HTMLAttributes<HTMLElement>{
  [data: string]: any;
  ayList?: any;
//   onSaveUpdate?: any;
}
const w140 = {
    width: '140px',
    marginBottom: '5px',
};
const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in preferences service, branch could not be saved. Please check preferences service logs";
const SUCCESS_MESSAGE_ACADEMIC_YEAR_ADDED = "New academic year saved successfully";
const SUCCESS_MESSAGE_ACADEMIC_YEAR_UPDATED = "Academic year updated successfully";
const ERROR_MESSAGE_DATES_OVERLAP = "End date cannot be prior or same as start date";

class AcademicYearObj {
    id: any;
    description: any;
    strStartDate: any;
    strEndDate: any;
    comments: any;
    status: any;

    constructor(id: any, description: any, strStartDate: any, strEndDate: any, comments: any, status: any) {
        this.id = id;
        this.description = description;
        this.strStartDate = strStartDate;
        this.strEndDate = strEndDate;
        this.comments = comments;
        this.status = status;
    }
}

class AcademicYear<T = {[data: string]: any}> extends React.Component<AcademicYearProps, any> {
  constructor(props: AcademicYearProps) {
      super(props);
      this.state = {
          ayList: this.props.ayList,
          isModalOpen: false,
          ayObj: {
              description: "",
              startDate: "",
              endDate: "",
              comments: "",
              status: "",
          },
          errorMessage: "",
          successMessage: "",
          modelHeader: "",
            columns: [
                {
                    label: "Id",
                    key: 'id',
                    isCaseInsensitive: true,
                },
                {
                    label: "Description",
                    key: 'description',
                    isCaseInsensitive: false,
                },
                {
                    label: "Start Date",
                    key: 'strStartDate',
                    isCaseInsensitive: false,
                },
                {
                    label: "End Date",
                    key: 'strEndDate',
                    isCaseInsensitive: false,
                },
                {
                    label: "Comments",
                    key: 'comments',
                    isCaseInsensitive: false,
                },
                {
                    label: "Status",
                    key: 'status',
                    isCaseInsensitive: false,
                },
                {
                  label: 'Action',
                  key: 'action',
                  renderCallback: (value: any, alert: any) => {
                    return <td>
                      <div className="d-inline-block">
                        <button className="btn btn-primary" onClick={e => this.showDetail(e, true, alert, "Edit Academic Year")}>
                          {/* <i onClick={e => this.showDetail(e,true,alert, "Edit Branch")} className="fa fa-edit"></i> */}
                                        Edit
                                      </button>
                      </div>
                    </td>
                  },
                  isCaseInsensitive: true
                }
            ],
        }; 
            this.registerSocket = this.registerSocket.bind(this);
            this.showDetail = this.showDetail.bind(this);
            // this.createRows = this.createRows.bind(this);
            this.doSave = this.doSave.bind(this);
            this.showModal = this.showModal.bind(this);
            this.onChange = this.onChange.bind(this);
            this.validateDates = this.validateDates.bind(this);
            this.validateFields = this.validateFields.bind(this);
           
        }

        registerSocket() {
            const socket = wsCmsBackendServiceSingletonClient.getInstance();
        }      

        showDetail(e: any, bShow: boolean, editObj: any, modelHeader: any) {
            e && e.preventDefault();
            const { ayObj } = this.state;
            ayObj.id = editObj.id;
            ayObj.startDate = moment(editObj.strStartDate,"DD-MM-YYYY").format("YYYY-MM-DD");
            ayObj.endDate = moment(editObj.strEndDate,"DD-MM-YYYY").format("YYYY-MM-DD");
            ayObj.description = editObj.description;
            ayObj.comments = editObj.comments;
            ayObj.status = editObj.status;
            this.setState(() => ({
                isModalOpen: bShow,
                ayObj: ayObj,
                modelHeader: modelHeader,
                errorMessage: "",
                successMessage: "",
            }));
        }
      showModal(e: any, bShow: boolean, headerLabel: any) {
          e && e.preventDefault();
          this.setState(() => ({
              isModalOpen: bShow,
              ayObj: {},
              modelHeader: headerLabel,
              errorMessage: "",
              successMessage: "",
          }));
      }
  
      onChange = (e: any) => {
          e.preventDefault();
          const { name, value } = e.nativeEvent.target;
          const { ayObj } = this.state;
          
          this.setState({
              ayObj: {
                  ...ayObj,
                  [name]: value
              },
              errorMessage: "",
              successMessage: "",
          });
          
          commonFunctions.restoreTextBoxBorderToNormal(name);
      }
      
      validateFields(obj: any){
        let isValid = true;
        let errorMessage = ""
        if(obj.description === undefined || obj.description === null || obj.description === ""){
            commonFunctions.changeTextBoxBorderToError((obj.description === undefined || obj.description === null) ? "" : obj.description, "description");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.startDate === undefined || obj.startDate === null || obj.startDate === ""){
            commonFunctions.changeTextBoxBorderToError((obj.startDate === undefined || obj.startDate === null) ? "" : obj.startDate, "startDate");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.endDate === undefined || obj.endDate === null || obj.endDate === ""){
            commonFunctions.changeTextBoxBorderToError((obj.endDate === undefined || obj.endDate === null) ? "" : obj.endDate, "endDate");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.comments === undefined || obj.comments === null || obj.comments === ""){
            commonFunctions.changeTextBoxBorderToError((obj.comments === undefined || obj.comments === null) ? "" : obj.comments , "comments");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if(obj.status === undefined || obj.status === null || obj.status === ""){
            commonFunctions.changeTextBoxBorderToError((obj.status === undefined || obj.status === null) ? "" : obj.status, "status");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
    
        if(isValid){
            isValid = this.validateDates(obj.startDate, obj.endDate);
            if(isValid === false){
                errorMessage = ERROR_MESSAGE_DATES_OVERLAP;
            }
         }
        

        this.setState({
            errorMessage: errorMessage
        });
        return isValid; 

    }
    validateDates(startDate: any, endDate: any){
        let stDate = moment(startDate, "YYYY-MM-DD");
        let enDate = moment(endDate, "YYYY-MM-DD");
        if (enDate.isSameOrBefore(stDate) || stDate.isSameOrAfter(enDate)) {
            return false;
        }
        return true;
    }
  async getAcademicYearList (){
    console.log("Refreshing academicYear list");
    const { data } =  await this.props.client.query({
        query: GET_ACADEMIC_YEAR_LIST,
        fetchPolicy: 'no-cache'
    })
    const temp = data.getAcademicYearList;
    console.log("Data : ", temp)
    this.setState({
      list: temp
    });
    }
  getAcademicYearInput(ayObj: any, modelHeader: any){
    let id = null;
    if(modelHeader === "Edit Academic Year"){
        id = ayObj.id;
    }
    let ayInput = {
        id: id,
        description: ayObj.description,
        strStartDate: moment(ayObj.startDate).format("DD-MM-YYYY"),
        strEndDate: moment(ayObj.endDate).format("DD-MM-YYYY"),
        comments: ayObj.comments,
        status: ayObj.status
    };
    return ayInput;
}
    
    async doSave(ayInput: any, id: any){
            let btn = document.querySelector("#"+id);
            btn && btn.setAttribute("disabled", "true");
            let exitCode = 0;
            
            await this.props.client.mutate({
                mutation: SAVE_ACADEMIC_YEAR,
                variables: { 
                    input: ayInput
                },
            }).then((resp: any) => {
                console.log("Success in saveAcademicYear Mutation. Exit code : ",resp.data.saveAcademicYear.cmsAcademicYearVo.exitCode);
                exitCode = resp.data.saveAcademicYear.cmsAcademicYearVo.exitCode;
                // this.props.onSaveUpdate(resp.data.saveAcademicYear.cmsAcademicYearVo.dataList);
                let temp = resp.data.saveAcademicYear.cmsAcademicYearVo.dataList; 
                console.log("New academic year list : ", temp);
                let i;
                let obj;
                let ary = [];
                for (i in temp) {
                obj = new AcademicYearObj(temp[i].id, 
                    temp[i].description, temp[i].strStartDate, 
                    temp[i].strEndDate, temp[i].comments, 
                    temp[i].status);
                ary.push(obj);
                }
                this.setState({
                    ayList: temp
                });
            }).catch((error: any) => {
                exitCode = 1;
                console.log('Error in saveAcademicYear : ', error);
            });
            btn && btn.removeAttribute("disabled");
            
            let errorMessage = "";
            let successMessage = "";
            if(exitCode === 0 ){
                successMessage = SUCCESS_MESSAGE_ACADEMIC_YEAR_ADDED;
                if(ayInput.id !== null){
                    successMessage = SUCCESS_MESSAGE_ACADEMIC_YEAR_UPDATED;
                }
            }else {
                errorMessage = ERROR_MESSAGE_SERVER_SIDE_ERROR;
            }
            this.setState({
                successMessage: successMessage,
                errorMessage: errorMessage
            });
        }
    
saveAcademicYear = (e: any) => {
            const { id } = e.nativeEvent.target;
            const {ayObj, modelHeader} = this.state;
            let isValid = this.validateFields(ayObj);
            if(isValid === false){
                return;
            }
            const ayInput = this.getAcademicYearInput(ayObj, modelHeader);
            this.doSave(ayInput, id);
        }

    async componentDidMount() {
            await this.getAcademicYear();
          }
          getAcademicYear = async () => {
            const { data } = await this.props.client.query({
              query: GET_ACADEMIC_YEAR_LIST,
            //   fetchPolicy: 'no-cache',
            })
            var arr = data.getAcademicYearList;
            let i;
            let finalAry = [];
            for (i in arr) {
            let obj = new AcademicYearObj(arr[i].id, arr[i].description, arr[i].strStartDate, arr[i].strEndDate, arr[i].comments, arr[i].status);
            finalAry.push(obj);
            }
            console.log("Final Array : ", finalAry);
            // }).then((res: any) => {
            //   const data=res.data;
            //   console.log("AcademicYear data :::", data.getAcademicYearList);
        
              this.setState({
                academicYearList: data.getAcademicYearList,
              });
        
              console.log(" state variable Academicyear data :::", this.state.ayList);
    
            // });
          }

    render() {
            const { ayList, isModalOpen, ayObj, modelHeader, errorMessage, successMessage, columns, academicYearList } = this.state;
            return (
        
              <section className="customCss">
         <Modal isOpen={isModalOpen} className="react-strap-modal-container">
                    <ModalHeader>{modelHeader}</ModalHeader>
                    <ModalBody className="modal-content">
                        <form className="gf-form-group section m-0 dflex">
                            <div className="modal-fwidth">
                            {
                                errorMessage !== ""  ? 
                                    <MessageBox id="mbox" message={errorMessage} activeTab={2}/>        
                                    : null
                            }
                            {
                                successMessage !== ""  ? 
                                    <MessageBox id="mbox" message={successMessage} activeTab={1}/>        
                                    : null
                            }
                                <div className="fwidth-modal-text modal-fwidth">
                                    <label className="gf-form-label b-0 bg-transparent">Description <span style={{ color: 'red' }}> * </span></label>
                                    <input type="text" className="gf-form-input " onChange={this.onChange}  value={ayObj.description} placeholder="Description" name="description" id="description" maxLength={255} />
                                </div>

                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Start Date <span style={{ color: 'red' }}> * </span></label>
                                        <input type="date" className="gf-form-input" onChange={this.onChange}  value={ayObj.startDate} placeholder="Start date" name="startDate" id="startDate" maxLength={10}  />
                                    </div>
                                    <div className="fwidth-modal-text">
                                    <label className="gf-form-label b-0 bg-transparent">End Date <span style={{ color: 'red' }}> * </span></label>
                                        <input type="date" className="gf-form-input" onChange={this.onChange}  value={ayObj.endDate} placeholder="End date" name="endDate" id="endDate" maxLength={10}  />
                                    </div>
                                </div>
                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Comments<span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" required className="gf-form-input" onChange={this.onChange}  value={ayObj.comments} placeholder="Comments" name="comments" id="comments" maxLength={255}/>
                                    </div>
                                    <div className="fwidth-modal-text">

                                        <label className="gf-form-label b-0 bg-transparent">Status<span style={{ color: 'red' }}> * </span></label>
                                        <select name="status" id="status" onChange={this.onChange} value={ayObj.status} className="gf-form-input">
                                            <option key={""} value={""}>Select Status</option>
                                            <option key={"ACTIVE"} value={"ACTIVE"}>ACTIVE</option>
                                            <option key={"DEACTIVE"} value={"DEACTIVE"}>DEACTIVE</option>
                                            <option key={"DRAFT"} value={"DRAFT"}>DRAFT</option>
                                        </select>
                                    </div> 
                                </div>
                                <div className="m-t-1 text-center">
                                    {
                                        modelHeader === "Add New Academic Year" ?
                                        <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.saveAcademicYear} >Save</button>
                                        :
                                        <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.saveAcademicYear}>Update</button>
                                    }
                                    &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false, modelHeader)}>Cancel</button>
                                    
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <button className="btn btn-primary" style={{width:'200px'}} onClick={e => this.showModal(e, true, "Add New Academic Year")}>
                    <i className="fa fa-plus-circle"></i> Add New Academic Year
                </button>
                <Table valueFromData={{ columns: this.state.columns, data: ayList }} perPageLimit={6} visiblecheckboxStatus={true} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" />
        
              </section>
            );
          }
        }
    

export default withApollo(AcademicYear);