import React from 'react';
import { useDispatch } from 'react-redux';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { updatePageIndex, updateQuery } from '../redux/actions';

const EmployeeTableComponent = ({employee, query, pageIndex, isLoading}) => {
    const dispatch = useDispatch();

    const {data, count} = employee;

    const {limit} = query;
    
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
              pageSizeOptions={[25, 50, 100, 500]}
              onPageChange={(index) => {
                // if(!index <0){
                    console.log(index)
                    dispatch(updatePageIndex(index));
                    let newQuery = query;
                    newQuery["skip"] = index * newQuery.limit;
                    console.log(newQuery);
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
                console.log(a, b)
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
            
        </React.Fragment>
     );
}
 
export default EmployeeTableComponent;