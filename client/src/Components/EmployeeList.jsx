import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import EmployeeTableComponent from './EmployeeTableComponent';
import {Card, CardTitle, CardHeader, CardBody, Button, Input} from 'reactstrap'
import DefaultModal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'toastr'
import { fetchEmployeesList, updatePageIndex, updateQuery, uploadEmployeeData } from '../redux/actions';
import { CSVLink } from "react-csv";


const EmployeeList = () => {
    const dispatch = useDispatch();
    
    const [isOpen, toggleModal] = useState(false);

    const [csvData] = useState([
        ["name", "email",  "age", "dob", 'reporting_manager', 'salary', 'department'],
        ["Alan Walker", "alan@gmail.com", "27", "22-03-1994", 'Andrew Ross', '1200000', 'IT'],
      ])

    const [file, setFile] = useState("");

    const employeeReducer = useSelector(state => state.employeeReducer);

    const isLoading = useSelector(state => state.loadingReducer.isLoading)

    const {employee, pageIndex, query} = employeeReducer;

    useEffect(() => {
        dispatch(fetchEmployeesList(query))
    },[query, pageIndex, dispatch])


    const handleFileChange = e => {
        if(e.target.files && e.target.files.length) {
            if(e.target.files[0].type !== "text/csv") {
                return toast.error('Please upload file in csv format. Take reference from sample')
            } else {
                setFile(e.target.files[0])
            }
        } else {
            alert('Please upload File')
        } 
    }

    return (
            <CardContainer>
                <Card>
                    <CardHeader color="white" className="d-flex align-items-center justify-content-spaceBetween">
                        <CardTitle>
                            Employee List
                        </CardTitle>
                        <Input type="text" placeholder="search" className="w-25" value={query.search} onChange={e => {
                                const newQuery=query;
                                newQuery['search'] = e.target.value;
                                newQuery['skip'] = 0;
                                dispatch(updatePageIndex(0));
                                dispatch(updateQuery(newQuery))
                            }} />
                        <div className="d-flex align-items-center" style={{justifyContent: 'space-between'}}>
                            
                            <Button 
                                style={{margin: '0 10px'}} 
                                color="primary" 
                                disabled={isLoading} 
                                onClick={() => toggleModal(true)}>Upload CSV</Button>
                                {/* <a onClick={() => downloadCsvFile()}>Sample</a> */}
                                <CSVLink filename={"employee_sample.csv"} data={csvData}>Sample</CSVLink>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <EmployeeTableComponent employee={employee} query={query} pageIndex={pageIndex} isLoading={isLoading} />
                    </CardBody>
                </Card>
                <DefaultModal 
                    isOpen={isOpen}
                    toggle={(bool) => toggleModal(bool)} 
                    confirm={() => {
                        if(file.type !== "text/csv") {
                            return toast.error('Please upload file in csv format. Take reference from sample')
                        }
                        let formData = new FormData();
                        formData.append('file', file)
                        dispatch(uploadEmployeeData(formData, () => {
                            const newQuery=query;
                            newQuery['skip'] = 0;
                            dispatch(updatePageIndex(0));
                            dispatch(updateQuery(newQuery))
                        // dispatch(fetchEmployeesList(newQuery))
                            toggleModal(false)
                    }))}} 
                    modalTitle="Upload Employee CSV">
                    <Input type="file" accept={['.csv']} onChange={handleFileChange} />
                </DefaultModal>
            </CardContainer>
     );
}
 
export default EmployeeList;