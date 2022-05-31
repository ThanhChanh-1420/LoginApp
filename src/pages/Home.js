import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUser, faComment, faChartPie, faTv, faBook, faSignOut, faCalendar, faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import "../css/home.css";
import ReactPaginate from 'react-paginate';
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
            hobbiesValue: '',
            size: 30,
            page: 1,
            totalPage: 0,
            pagestotal: []


        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    getList = async () => {

        const filter = {
            page: this.state.page,
            limitEntry: this.state.size,
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
                'Authorization': localStorage.getItem('my-key'),
            }
        }).then(response => {
            //console.log(response.data.data.sizeQuerySnapshot);
            let totalPage = Math.ceil(response.data.data.sizeQuerySnapshot / this.state.size)
            let pages = []
            for (let i = 1; i <= totalPage; i++) {
                let object = {}
                object.pageNumber = i
                object.pageName = 'Trang ' + i
                pages.push(object)
            }
            console.log(pages);
            if (this.state.is_mounted) {
                this.setState({
                    listReport: response.data.data.data,
                    pagestotal: pages,
                    totalPage: totalPage
                });

            }
            console.log(this.state.pagestotal);
        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.setState({ is_mounted: true }, () => { this.getList() });
        //this.getList();
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
        }, () => { this.getList() });

        console.log(this.state.startDate);
        console.log(this.state.endDate);
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

    handleInputChangeNumber(event) {
        var value = event;
        this.setState({
            page: value
        }, () => { this.getList() })

        console.log(this.state.page);
    }

    previousPage(event) {
        var value = event;
        if (value > 1) {
            this.setState({
                page: value - 1,
            }, () => { this.getList() })
        }
    }

    nextPage(event) {
        var value = event;
        //console.log(value);
        console.log(this.state.totalPage)
        if (value < this.state.totalPage) {
            this.setState({
                page: value + 1,
            }, () => { this.getList() })
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        var listReport = "";
        listReport = this.state.listReport.map((item) => {
            return (
                <div className="col-sm-3" key={item.id}>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h4 className="card-title">{item.reportNo}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">{moment(new Date(item.reportTime * 1000)).format('MM/DD/YYYY hh:MM')}</h6>
                            <p className="card-text">Bắc buộc | Trang thiết bị cơ sở hạ tầng</p>
                            <p className="card-text">{item.reporterName}</p>
                            <p className="card-text text_end" data-toggle="collapse" data-target="#demo">{item.shortDescription}</p>
                        </div>
                    </div>
                </div>
            );
        });

        var pageNumber = "";
        pageNumber = this.state.pagestotal.map((item) => {
            return (
                <li className="page-item" key={item.pageNumber}><button className="page-link button" onClick={(e) => this.handleInputChangeNumber(item.pageNumber)}>{item.pageNumber}</button></li>
            );
        });

        return (
            <div>
                {/*Navbar blue*/}
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
                    <div className="pt-1 pb-1 logo" id="logolink">
                    <a className="nav-link" href="/Home"><span className="spanImg" >QLSC </span><img clasName="logoImg" id="logoImg" src={require('../assets/logo_01.png')} /></a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/Home">Danh sách<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Theo dỏi và giám sát</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Biểu đồ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Thông báo </a>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <a className="nav-link" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cá nhân </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Thông tin </a>
                                        <a className="dropdown-item" href="#" onClick={this.logout.bind(this)}>Đăng xuất </a>
                                    </div>
                                </div>
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
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="0" onChange={this.handleInputChange} />
                                                                            Mới
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="1" onChange={this.handleInputChange} />
                                                                            Phân tích
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="2" onChange={this.handleInputChange} />
                                                                            Đang xử lý
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="3" onChange={this.handleInputChange} />
                                                                            Đã xử lý
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="4" onChange={this.handleInputChange} />
                                                                            Đã hủy
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <div className="card" >
                                                                    <div className="form-group">
                                                                        <label className="btn btn-secondary active">
                                                                            <input className="form-check-input" type="radio" name="status" id="inlineradioh1" value="5" onChange={this.handleInputChange} />
                                                                            Đã đóng
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <div className="container-sm p-3">
                                                        <div className="row">
                                                            <div className="col-sm-6 button-filter">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                            </div>
                                                            <div className="col-sm-6 button-filter">
                                                                <button type="submit" className="btn btn-primary" onClick={this.getList.bind(this)}>Xác nhận</button>
                                                            </div>
                                                        </div>
                                                    </div>
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
                <div className="container-sm p-3">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><button className="page-link button" onClick={(e) => this.previousPage(this.state.page)}>Previous</button></li>
                            {pageNumber}
                            <li className="page-item"><button className="page-link button" onClick={(e) => this.nextPage(this.state.page)}>Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>

        );
    }
}

export default Home;