import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { deleteEmployeeData, updatePageIndex, updateQuery } from '../redux/actions';
import * as Icon from "react-feather";
import DefaultModal from './Modal';
import EmployeeDetail from './EmployeeDetail';

const EmployeeTableComponent = ({employee, query, pageIndex, isLoading}) => {
    const dispatch = useDispatch();

    const {data, count} = employee;

    const {limit} = query;

    const [openEmpModal, toggleEmpModal] = useState(false);
    const [openEmpDeleteModal, toggleEmpDeleteModal] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState("");
    const [selectedEmpDetail, setSelectedEmpDetail] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        reporting_manager: '',
        salary: '',
        department:''
    })
    
    const getColumn = () => {
        let columns =  [
            {
                Header: '#',
                Cell: (props) =>
                    (pageIndex + 1) * limit -
                    limit +
                    1 +
          props.index,
                width: 50
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Date of Birth',
                accessor: 'dob',
            },
            {
                Header: 'Reporting Manager',
                accessor: 'reporting_manager',
            },
            {
                Header: 'Salary',
                accessor: 'salary',
            },
            {
                Header: 'Department',
                accessor: 'department',
            },
            {
                Header: 'Actions',
                sortable: false,
                Cell: props => {
                    return <React.Fragment>
                        <a
                            title="View Employee" className="action_tag primary" onClick={() => {
                                setSelectedEmpDetail({...selectedEmpDetail, ...props.original})
                                toggleEmpModal(true)
                            }
                            }
                        >
                            <Icon.Eye size={20} />
                        </a>
                        <a
                            title="Delete Employee" className="action_tag danger" onClick={() => {
                                toggleEmpDeleteModal(true)
                                setSelectedEmpId(props.original._id)
                            }}
                        >
                            <Icon.Trash2 size={20} className="mr-50" />
                        </a>
                    </React.Fragment>
                }
            }
        ];
        return columns
    }

    return ( 
        <React.Fragment>
            
            <ReactTable
              data={data}
              columns={getColumn()}
              defaultPageSize={limit}
              pages={Math.ceil(count / limit)}
              page={pageIndex}
              manual
              className="-striped -highlight blog_data"
              pageSizeOptions={[5, 10, 25, 50, 100, 500]}
              onPageChange={(index) => {
                // if(!index <0){
                    dispatch(updatePageIndex(index));
                    let newQuery = query;
                    newQuery["skip"] = index * newQuery.limit;
                    dispatch(updateQuery(newQuery));
              }}
              onPageSizeChange={(rowPerPage) => {
                let newQuery = query;
                newQuery["limit"] = rowPerPage;
                newQuery["skip"] = 0;
                dispatch(updatePageIndex(0));
                dispatch(updateQuery(newQuery));
              }}
            //   minRows={5}
              noDataText="No Employee found"
            onSortedChange={(a, b) => {
                let newQuery = query;
                
                if(b.Header === "Name") {
                    newQuery["sortKey"] = 'name';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Email") {
                    newQuery["sortKey"] = 'email';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Age") {
                    newQuery["sortKey"] = 'age';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Date of Birth") {
                    newQuery["sortKey"] = 'dob';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Reporting Manager") {
                    newQuery["sortKey"] = 'reporting_manager';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Salary") {
                    newQuery["sortKey"] = 'salary';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
                if(b.Header === "Department") {
                    newQuery["sortKey"] = 'department';
                    newQuery["sortType"] = newQuery["sortType"] === "asc" ? "desc": "asc"
                    dispatch(updateQuery(newQuery))
                }
            }}
            showPaginationTop= {true}
            showPaginationBottom= {false}
            loading={isLoading}
            
            />
            <DefaultModal
                    isOpen={openEmpModal}
                    toggle={(bool) => toggleEmpModal(bool)} 
                    noSubmit={true}
                    cancelText="Close"
                    confirm={() => {
                        
                    }} 
                    modalTitle="Employee Detail">
                        <EmployeeDetail {...selectedEmpDetail} />
                </DefaultModal>
                <DefaultModal
                    isOpen={openEmpDeleteModal}
                    toggle={(bool) => toggleEmpDeleteModal(bool)} 
                    // noSubmit={true}
                    confirm={() => {
                        dispatch(deleteEmployeeData(selectedEmpId, () => {
                            toggleEmpDeleteModal(false)
                            const newQuery=query;
                            newQuery['skip'] = 0;
                            dispatch(updatePageIndex(0));
                            dispatch(updateQuery(newQuery))
                        }))
                    }} 
                    modalTitle="Delete Employee Data">
                        Do you really want to delete the given employee data ?
                </DefaultModal>
            
        </React.Fragment>
     );
}
 
export default EmployeeTableComponent;