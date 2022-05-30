import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import "../css/home.css";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listReport: [],
            is_mounted: false,
            incidentObject: [],
            reportStatus: [],
            reportType: [],
            startDate: '',
            endDate: '',
            hobbiesName: '',
            hobbiesValue: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getList = async () => {

        const filter = {
            page: 1,
        }

        if (this.state.startDate != '' && this.state.endDate != '') {
            filter['reportTime'] = this.state.startDate + ', ' + this.state.endDate;
        }

        if (this.state.hobbiesName != '' && this.state.hobbiesValue != '') {
            filter['status'] = this.state.hobbiesValue;
        }

        console.log(filter);
        axios.post('https://qlsc.maysoft.io/server/api/getAllReports', filter, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY',
            }
        }).then(response => {
            //console.log(response.data.data.data);
            if (this.state.is_mounted) {
                this.setState({
                    listReport: response.data.data.data,
                });
            }
            console.log(this.state.listReport);
        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.setState({ is_mounted: true });
        this.getList();
    }
    componentWillUnmount() {
        this.setState({ is_mounted: false });
    }

    handleEvent(event, picker) {
        //console.log(picker.startDate);
        //console.log(picker.endDate);
    }
    handleCallback(start, end) {
        let d = new Date(start['_d']).toISOString();
        let e = new Date(end['_d']).toISOString();
        let x = new Date(d).getTime() / 1000;
        let y = new Date(e).getTime() / 1000;
        this.setState({
            startDate: x,
            endDate: y,
        });

        console.log(this.state.startDate);
        console.log(this.state.endDate);
        this.getList();
        //console.log(start['_d'], end['_d']);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        if (target.checked) {
            const name = target.name;
            this.setState({
                hobbiesName: name,
                hobbiesValue: value
            })
            //this.state.hobbies[name] = value;
            console.warn(this.state);
        }
    }

    render() {
        var listReport = "";
        listReport = this.state.listReport.map((item) => {
            return (
                <div className="col-sm-4" key={item.id}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h4 className="card-title">{item.reportNo}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">{moment(new Date(item.reportTime * 1000)).format('MM/DD/YYYY hh:MM')}</h6>
                            <p className="card-text">Bắc buộc | Trang thiết bị cơ sở hạ tầng</p>
                            <p className="card-text">{item.reporterName}</p>
                            <p classname="card-text text_end" data-toggle="collapse" data-target="#demo">{item.shortDescription}</p>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                {/*Navbar blue*/}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><h3>QLSC</h3></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/Home">Danh sách <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Theo dỏi và giám sát</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Biểu đồ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Thông báo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cá nhân</a>
                            </li>
                            <li className="nav-item">
                                <div className="p-1 bg-light rounded rounded-pill shadow-sm">
                                    <div className="input-group">
                                        {/* <DateRangePicker>
                                            <input type="text" className="form-control text-date" />
                                        </DateRangePicker> */}
                                        <DateRangePicker onEvent={this.handleEvent.bind(this)} onCallback={this.handleCallback.bind(this)}>
                                            <input type="text" className="form-control text-date" />
                                        </DateRangePicker>
                                        <div className="input-group-append">
                                            <button id="button-addon1" type="submit" className="btn btn-link text-primary"><FontAwesomeIcon className="iconCalendar" icon={faCalendar} /></button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-primary" data-toggle="modal" data-target="#exampleModal"><FontAwesomeIcon className="iconFilter" icon={faFilter} /></button>

                                    {/* Modal */}
                                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Bộ lọc</h5>
                                                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button> */}
                                                </div>
                                                <div className="modal-body">
                                                    <div className="container-sm p-3">
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="0" onChange={this.handleInputChange} />
                                                                            Mới
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="1" onChange={this.handleInputChange} />
                                                                            Phân tích
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="2" onChange={this.handleInputChange} />
                                                                            Đang xử lý
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="3" onChange={this.handleInputChange} />
                                                                            Đã xử lý
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="4" onChange={this.handleInputChange} />
                                                                            Đã hủy
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="checkbox" name="status" id="inlineCheckboxh1" value="5" onChange={this.handleInputChange} />
                                                                            Đã đóng
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                    <button type="submit" className="btn btn-primary" onClick={this.getList.bind(this)}>Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/*/.Navbar blue*/}

                <div className="container-sm p-3">
                    <div className="row">
                        {listReport}
                    </div>
                </div>
            </div>

        );
    }
}

export default Home;