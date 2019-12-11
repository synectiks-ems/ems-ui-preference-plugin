import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export class Subjects extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isModalOpen: false,
            states: [],
            cities: [],
            selectedState: "",
            selectedCity: ""
        };
        this.showModal = this.showModal.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        // this.createCitySelectbox = this.createCitySelectbox.bind(this);
    }

    // componentDidMount() {
    //     collegeSettingsServices.getStates().then(
    //         response => {
    //             this.setState({
    //                 states: response
    //             });
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     );
    //     collegeSettingsServices.getCities().then(
    //         response => {
    //             this.setState({
    //                 cities: response
    //             });
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     );
    // }

    showModal(e: any, bShow: boolean) {
        e && e.preventDefault();
        this.setState(() => ({
            isModalOpen: bShow
        }));
    }

    handleStateChange(e: any) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    // createCitySelectbox(selectedState: any) {
    //     const { cities } = this.state;
    //     let retData: any[] = [];
    //     selectedState = parseInt(selectedState);
    //     for (let i = 0; i < cities.length; i++) {
    //         let city = cities[i];
    //         if (selectedState === city.stateId) {
    //             retData.push(
    //                 <option key={city.id} value={city.id}>{city.cityName}</option>
    //             );
    //         }
    //     }
    //     return retData;
    // }

    // createStateSelectbox(stateList: any) {
    //     let retData: any[] = [];
    //     if (stateList.length > 0) {
    //         for (let i = 0; i < stateList.length; i++) {
    //             let item = stateList[i];
    //             retData.push(
    //                 <option value={item["id"]} key={item["id"]}>{item["stateName"]}</option>
    //             );
    //         }
    //     }
    //     return retData;
    // }

    render() {
        const { isModalOpen } = this.state;
        return (
            <div className="info-container">
                <div className="authorized-signatory-container m-b-1">
                    <h3>subject Setup</h3>
                </div>
                <button onClick={e => this.showModal(e, true)}>
                    <i className="fa fa-plus-circle"></i> Add new
                </button>
                <Modal isOpen={isModalOpen} className="react-strap-modal-container">
                    <ModalHeader>Add New</ModalHeader>
                    <ModalBody className="modal-content">
                        <form className="gf-form-group section m-0 dflex">
                            <div className="modal-fwidth">


                                <div className="fwidth-modal-text modal-fwidth m-r-1">
                                    <label className="gf-form-label b-0 bg-transparent">SUBJECT NAME</label>
                                    <input type="text" required ng-model="subject.subjectDesc" className="gf-form-input "
                                        placeholder="subject name" />
                                </div>
                                <div className="fwidth-modal-text modal-fwidth">
                                    <label className="gf-form-label b-0 bg-transparent">SUBJECT CODE</label>
                                    <input type="text" required ng-model="subject.subjectCode" className="gf-form-input"
                                        placeholder="subject Code" />
                                </div>
                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">DEPARTMENT</label>
                                        <select className="gf-form-select-wrapper" ng-model="subject.departmentId" ng-change="onChangeDepartment()" required >
                                            <option value="">Select Department</option>
                                            {/* <option ng-repeat="department in departments" value="{{department.id}}">{{}}</option> */}
                                        </select>
                                    </div>
                                    <div className="fwidth-modal-text">
                                        <label className="gf-form-label b-0 bg-transparent">YEAR</label>
                                        <select className="gf-form-select-wrapper" ng-model="subject.batchId" required>
                                            <option value="">select year</option>
                                            {/* <option ng-repeat="batch in selectedBatches" value="{{batch.id}}">{{}}</option> */}
                                        </select>
                                    </div>
                                </div>
                                <div className="mdflex modal-fwidth">
                                    <div className="fwidth-modal-text m-r-1">
                                        <label className="gf-form-label b-0 bg-transparent">ASSIGN TEACHER</label>
                                        <select className="gf-form-select-wrapper" ng-model="subject.teacherId" required>
                                            <option value="">Select Teacher</option>
                                            {/* <option ng-repeat="teacher in teachers" value="{{teacher.id}}">{{  }}</option> */}
                                        </select>
                                    </div>
                                    <div className="fwidth-modal-text m-r-1 switch-flex">
                                        <div>
                                            <label className="gf-form-label b-0 bg-transparent">Status</label>
                                            <label className="switch">
                                                <input type="checkbox" ng-model="subject.status" ng-true-value="'ACTIVE'"
                                                    ng-false-value="'DEACTIVE'" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mdflex modal-fwidth">

                                    <div className="fwidth-modal-text m-r-1 switch-flex">
                                        <label className="gf-form-label b-0 bg-transparent">Sections</label>
                                        <div>
                                            <label className="gf-form-label b-0 bg-transparent">A</label>
                                            <label className="switch">
                                                <input type="checkbox" ng-model="subject.sectionA" ng-true-value="'A'"
                                                    ng-false-value="" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="gf-form-label b-0 bg-transparent">B</label>
                                            <label className="switch">
                                                <input type="checkbox" ng-model="subject.sectionB" ng-true-value="'B'"
                                                    ng-false-value="" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="gf-form-label b-0 bg-transparent">C</label>
                                            <label className="switch">
                                                <input type="checkbox" ng-model="subject.sectionC" ng-true-value="'C'"
                                                    ng-false-value="" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                        <div>
                                            <label className="gf-form-label b-0 bg-transparent">D</label>
                                            <label className="switch">
                                                <input type="checkbox" ng-model="subject.sectionD" ng-true-value="'D'"
                                                    ng-false-value="" />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-t-1 text-center">
                                    <button type="submit" className="btn btn-success border-bottom">Save</button>
                                    <button type="submit" className="btn btn-success border-bottom">Update</button>
                                    <button className="btn btn-danger border-bottom" onClick={(e) => this.showModal(e, false)}>Cancel</button>
                                </div>
                              
                                
                            </div>
                        </form>
                        
                    </ModalBody>
                </Modal>
                <table id="academic" className="fwidth">
                    <thead>
                        <th>Subject</th>
                        <th>Subject Code</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Teacher</th>
                        <th>Elective</th>
                        <th>Status</th>
                      
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        );
    }
}