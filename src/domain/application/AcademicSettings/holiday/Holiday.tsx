import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { commonFunctions } from '../../_utilites/common.functions';
import "../../../../css/custom.css";
import { MessageBox } from '../../Message/MessageBox'
import { withApollo } from 'react-apollo';
import { SAVE_HOLIDAY, GET_HOLIDAY_LIST } from '../../_queries';
import * as moment from 'moment';
import Table from '../../../../css/table';

export interface HolidayProps extends React.HTMLAttributes<HTMLElement> {
    [data: string]: any;
    holidayList?: any;
    ayList?: any;
}
const w140 = {
    width: '140px',
    marginBottom: '5px',
};

const ERROR_MESSAGE_MANDATORY_FIELD_MISSING = "Mandatory fields missing";
const ERROR_MESSAGE_SERVER_SIDE_ERROR = "Due to some error in preferences service, holiday could not be saved. Please check preferences service logs";
const SUCCESS_MESSAGE_HOLIDAY_ADDED = "New holiday saved successfully";
const SUCCESS_MESSAGE_HOLIDAY_UPDATED = "Holiday updated successfully";
class HolidayObj {
    id: any;
    description: any;
    strHolidayDate: any;
    comments: any;
    academicYearDescription: any;
    status: any;

    constructor(id: any, description: any, strHolidayDate: any, comments: any, academicYearDescription: any, status: any) {
        this.id = id;
        this.description = description;
        this.strHolidayDate = strHolidayDate;
        this.comments = comments;
        this.academicYearDescription = academicYearDescription;
        this.status = status;
    }
}
class Holiday<T = { [data: string]: any }> extends React.Component<HolidayProps, any> {
    constructor(props: HolidayProps) {
        super(props);
        this.state = {
            holidayList: [],
            ayList: this.props.ayList,
            isModalOpen: false,
            holidayObj: {
                description: "",
                strHolidayDate: "",
                comments: "",
                status: "",
                academicYearId: "",
            },
            errorMessage: "",
            successMessage: "",
            modelHeader: "",
            holidayObjList: [],
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
                    label: "Holiday Date",
                    key: 'strHolidayDate',
                    isCaseInsensitive: false,
                },
                {
                    label: "Comments",
                    key: 'comments',
                    isCaseInsensitive: false,
                },
                {
                    label: "Academic Year",
                    key: 'academicYearDescription',
                    isCaseInsensitive: false,
                },
                {
                    label: "status",
                    key: 'status',
                    isCaseInsensitive: false,
                },
                {
                    label: 'Action',
                    key: 'action',
                    renderCallback: (value: any, alert: any) => {
                        return <td>
                            <div className="d-inline-block">
                                <button className="btn btn-primary" onClick={e => this.showDetail(e, true, alert, "Edit Holiday")}>
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

    }


    showDetail(e: any, bShow: boolean, editObj: any, modelHeader: any) {
        e && e.preventDefault();
        const { holidayObj } = this.state;
        holidayObj.id = editObj.id;
        holidayObj.holidayDate = moment(editObj.strHolidayDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        holidayObj.description = editObj.description;
        holidayObj.comments = editObj.comments;
        holidayObj.status = editObj.status;
        holidayObj.academicYearId = editObj.academicYearId;

        this.setState(() => ({
            isModalOpen: bShow,
            holidayObj: holidayObj,
            modelHeader: modelHeader,
            errorMessage: "",
            successMessage: "",
        }));
    }
    // createRows(objAry: any) {
    //     const { source } = this.state;
    //     console.log("createRows() - holiday list on holiday page:  ", objAry);
    //     if(objAry === undefined || objAry === null) {
    //         return;
    //     }
    //     const aryLength = objAry.length;
    //     const retVal = [];
    //     for (let i = 0; i < aryLength; i++) {
    //         const obj = objAry[i];
    //         retVal.push(
    //           <tr >
    //             <td>{obj.id}</td>
    //             <td>{obj.description}</td>
    //             <td>{obj.strHolidayDate}</td>
    //             <td>{obj.comments}</td>
    //             <td>{obj.cmsAcademicYearVo.description}</td>
    //             <td>{obj.status}</td>
    //             <td>
    //                 {
    //                     <button className="btn btn-primary" onClick={e => this.showDetail(e, true, obj, "Edit Holiday")}>Edit</button>
    //                 }
    //             </td>
    //           </tr>
    //         );
    //     }
    //     return retVal;
    // }
    showModal(e: any, bShow: boolean, headerLabel: any) {
        e && e.preventDefault();
        this.setState(() => ({
            isModalOpen: bShow,
            holidayObj: {},
            modelHeader: headerLabel,
            errorMessage: "",
            successMessage: "",
        }));
    }

    onChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.nativeEvent.target;
        const { holidayObj } = this.state;

        this.setState({
            holidayObj: {
                ...holidayObj,
                [name]: value
            },
            errorMessage: "",
            successMessage: "",
        });

        commonFunctions.restoreTextBoxBorderToNormal(name);
    }

    validateFields(obj: any) {
        let isValid = true;
        let errorMessage = ""
        if (obj.academicYearId === undefined || obj.academicYearId === null || obj.academicYearId === "") {
            commonFunctions.changeTextBoxBorderToError((obj.academicYearId === undefined || obj.academicYearId === null) ? "" : obj.academicYearId, "academicYearId");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if (obj.description === undefined || obj.description === null || obj.description === "") {
            commonFunctions.changeTextBoxBorderToError((obj.description === undefined || obj.description === null) ? "" : obj.description, "description");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if (obj.holidayDate === undefined || obj.holidayDate === null || obj.holidayDate === "") {
            commonFunctions.changeTextBoxBorderToError((obj.holidayDate === undefined || obj.holidayDate === null) ? "" : obj.holidayDate, "holidayDate");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }
        if (obj.status === undefined || obj.status === null || obj.status === "") {
            commonFunctions.changeTextBoxBorderToError((obj.status === undefined || obj.status === null) ? "" : obj.status, "status");
            errorMessage = ERROR_MESSAGE_MANDATORY_FIELD_MISSING;
            isValid = false;
        }

        // if(isValid){
        //     isValid = this.validateDates(obj.startDate, obj.endDate);
        //     if(isValid === false){
        //         errorMessage = ERROR_MESSAGE_DATES_OVERLAP;
        //     }
        //  }


        this.setState({
            errorMessage: errorMessage
        });
        return isValid;

    }
    getHolidayInput(holidayObj: any, modelHeader: any) {
        let id = null;
        if (modelHeader === "Edit Holiday") {
            id = holidayObj.id;
        }
        let ayInput = {
            id: id,
            description: holidayObj.description,
            strHolidayDate: moment(holidayObj.holidayDate).format("DD-MM-YYYY"),
            comments: holidayObj.comments,
            status: holidayObj.status,
            academicYearId: holidayObj.academicYearId
        };
        return ayInput;
    }

    async doSave(holidayInput: any, id: any) {
        let btn = document.querySelector("#" + id);
        btn && btn.setAttribute("disabled", "true");
        let exitCode = 0;

        await this.props.client.mutate({
            mutation: SAVE_HOLIDAY,
            variables: {
                input: holidayInput
            },
        }).then((resp: any) => {
            console.log("Success in saveHoliday Mutation. Exit code : ", resp.data.saveHoliday.cmsHolidayVo.exitCode);
            exitCode = resp.data.saveHoliday.cmsHolidayVo.exitCode;
            let temp = resp.data.saveHoliday.cmsHolidayVo.dataList;
            console.log("New holiday list : ", temp);
            let i;
             let obj;
            let ary = [];
            for (i in temp) {
            obj = new HolidayObj(temp[i].id, temp[i].description, temp[i].strHolidayDate, temp[i].comments, temp[i].cmsAcademicYearVo.description, temp[i].status);
            ary.push(obj);
            }
            this.setState({
                holidayList: ary
            });
        }).catch((error: any) => {
            exitCode = 1;
            console.log('Error in saveHoliday : ', error);
        });
        btn && btn.removeAttribute("disabled");

        let errorMessage = "";
        let successMessage = "";
        if (exitCode === 0) {
            successMessage = SUCCESS_MESSAGE_HOLIDAY_ADDED;
            if (holidayInput.id !== null) {
                successMessage = SUCCESS_MESSAGE_HOLIDAY_UPDATED;
            }
        } else {
            errorMessage = ERROR_MESSAGE_SERVER_SIDE_ERROR;
        }
        this.setState({
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    }
    // componentDidMount() {
    //     try {
    //       this.getHolidayList();
    //     } catch (error) {

    //     }
    //   }
    async getHolidayList() {
        console.log("Refreshing Holiday list");
        const { data } = await this.props.client.query({
            query: GET_HOLIDAY_LIST,
            fetchPolicy: 'no-cache'
        })

        const temp = data.getHolidayList;
        console.log("Data : ", temp)
        // console.log("final data : ", temp);
        // let i;
        // let obj;
        // let ary=[];
        // for(i in temp){
        //   obj=new HolidayObj(temp[i].id,temp[i].description,temp[i].strHolidayDate,temp[i].comments,temp[i].cmsAcademicYearVo.description,temp[i].status);

        //     ary.push(obj);
        // }
        // console.log("Final ary::  ",ary)
        // this.setState({
        //   holidayList: ary,
        //   holidayObjList:temp,

        this.setState({
            list: temp
        });
    }
    async componentDidMount() {

        await this.getHoliday();
    }
    getHoliday = async () => {
        const { data } = await this.props.client.query({
            query: GET_HOLIDAY_LIST,
            fetchPolicy: 'no-cache'
        })
        var arr = data.getHolidayList;
        let i;
        let finalAry = [];
        for (i in arr) {
            let obj = new HolidayObj(arr[i].id, arr[i].description, arr[i].strHolidayDate, arr[i].comments, arr[i].cmsAcademicYearVo.description, arr[i].status);
            finalAry.push(obj);
        }
        console.log("Final Array : ", finalAry);
        this.setState({
            holidayList: finalAry,
            // academicYearList: data.getAcademicYearList,
        });

        console.log(" state variable Holiday data :::", this.state.holidayList);
    }

    saveHoliday = (e: any) => {
        const { id } = e.nativeEvent.target;
        const { holidayObj, modelHeader } = this.state;
        let isValid = this.validateFields(holidayObj);
        if (isValid === false) {
            return;
        }
        const holidayInput = this.getHolidayInput(holidayObj, modelHeader);
        this.doSave(holidayInput, id);
    }

    render() {
        const { columns, ayList, holidayList, academicYearList, isModalOpen, holidayObj, modelHeader, errorMessage, successMessage } = this.state;
        return (

            <section className="customCss">
                <Modal isOpen={isModalOpen} className="react-strap-modal-container">
                    <ModalHeader>{modelHeader}</ModalHeader>
                    <ModalBody className="modal-content">
                        <form className="gf-form-group section m-0 dflex">
                            <div className="modal-fwidth">
                                {
                                    errorMessage !== "" ?
                                        <MessageBox id="mbox" message={errorMessage} activeTab={2} />
                                        : null
                                }
                                {
                                    successMessage !== "" ?
                                        <MessageBox id="mbox" message={successMessage} activeTab={1} />
                                        : null
                                }
                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Academic Year<span style={{ color: 'red' }}> * </span></label>
                                        <select name="academicYearId" id="academicYearId" onChange={this.onChange} value={holidayObj.academicYearId} className="gf-form-input">
                                            <option value="">Select Academic Year</option>
                                            {
                                                commonFunctions.createSelectbox(ayList, "id", "id", "description")
                                            }
                                        </select>
                                    </div>

                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">Description <span style={{ color: 'red' }}> * </span></label>
                                        <input type="text" className="gf-form-input" onChange={this.onChange} value={holidayObj.description} placeholder="Description" name="description" id="description" maxLength={255} />
                                    </div>
                                </div>
                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">Holiday Date <span style={{ color: 'red' }}> * </span></label>
                                        <input type="date" className="gf-form-input" onChange={this.onChange} value={holidayObj.holidayDate} placeholder="Holiday date" name="holidayDate" id="holidayDate" maxLength={10} />
                                    </div>
                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">Comments</label>
                                        <input type="text" required className="gf-form-input" onChange={this.onChange} value={holidayObj.comments} placeholder="Comments" name="comments" id="comments" maxLength={255} />
                                    </div>
                                </div>
                                <div className="mdflex modal-fwidth">

                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">Status<span style={{ color: 'red' }}> * </span></label>
                                        <select name="status" id="status" onChange={this.onChange} value={holidayObj.status} className="gf-form-input">
                                            <option key={""} value={""}>Select Status</option>
                                            <option key={"ACTIVE"} value={"ACTIVE"}>ACTIVE</option>
                                            <option key={"DEACTIVE"} value={"DEACTIVE"}>DEACTIVE</option>
                                            <option key={"DRAFT"} value={"DRAFT"}>DRAFT</option>
                                        </select>
                                    </div>
                                    <div className="fwidth-modal-text">&nbsp;</div>
                                </div>
                                <div className="m-t-1 text-center">
                                    {
                                        modelHeader === "Add New Holiday" ?
                                            <button type="button" id="btnAdd" className="btn btn-primary border-bottom" onClick={this.saveHoliday} >Save</button>
                                            :
                                            <button type="button" id="btnUpdate" className="btn btn-primary border-bottom" onClick={this.saveHoliday}>Update</button>
                                    }
                                    &nbsp;<button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false, modelHeader)}>Cancel</button>

                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={e => this.showModal(e, true, "Add New Holiday")}>
                    <i className="fa fa-plus-circle"></i> Add New Holiday
                </button>
                {/* 
                {
                    holidayList !== null && holidayList !== undefined && holidayList.length > 0 ?
                        <div style={{width:'100%', height:'250px', overflow:'auto'}}>
                            <table id="ayTable" className="striped-table fwidth bg-white p-2 m-t-1">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Description</th>
                                        <th>Holiday Date</th>
                                        <th>Comments</th>
                                        <th>Academic Year</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.createRows(holidayList) }
                                </tbody>
                            </table>
                        </div>
                    : null
                } */}

                <Table valueFromData={{ columns: this.state.columns, data: holidayList }} perPageLimit={6} visiblecheckboxStatus={true} tableClasses={{ table: "alert-data-tabel", tableParent: "alerts-data-tabel", parentClass: "all-alert-data-table" }} searchKey="name" showingLine="Showing %start% to %end% of %total%" />

            </section>
        );
    }
}




export default withApollo(Holiday);