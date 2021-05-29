import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import EmployeeTableComponent from './EmployeeTableComponent';
import {Card, CardTitle, CardHeader, CardBody, Button, Input} from 'reactstrap'
import FileUploadModal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'toastr'
import { fetchEmployeesList, updatePageIndex, updateQuery, uploadEmployeeData } from '../redux/actions';

const EmployeeList = () => {
    const dispatch = useDispatch();
    
    const [isOpen, toggleModal] = useState(false);

    const [file, setFile] = useState("");

    const employeeReducer = useSelector(state => state.employeeReducer);

    const isLoading = useSelector(state => state.loadingReducer.isLoading)

    const {employee, pageIndex, query} = employeeReducer;

    useEffect(() => {
        console.log(query)
        dispatch(fetchEmployeesList(query))
    },[query])


    const handleFileChange = e => {
        if(e.target.files && e.target.files.length) {
            if(e.target.files[0].type !== "text/csv") {
                return toast.error('Please upload file in csv format. Take reference from sample')
            } else {
                setFile(e.target.files[0])
                console.log(e.target.files[0].type)
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
                        <div className="d-flex align-items-center" style={{justifyContent: 'space-between'}}>
                            <Input type="text" placeholder="search" value={query.search} onChange={e => {
                                const newQuery=query;
                                newQuery['search'] = e.target.value;
                                newQuery['skip'] = 0;
                                dispatch(updatePageIndex(0));
                                dispatch(updateQuery(newQuery))
                            }} />
                            <Button 
                                style={{marginLeft: '10px'}} 
                                color="primary" 
                                disabled={isLoading} 
                                onClick={() => toggleModal(true)}>Upload</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <EmployeeTableComponent employee={employee} query={query} pageIndex={pageIndex} isLoading={isLoading} />
                    </CardBody>
                </Card>
                <FileUploadModal 
                    isOpen={isOpen}
                    toggle={(bool) => toggleModal(bool)} 
                    confirm={() => {
                        let formData = new FormData();
                        formData.append('file', file)
                        dispatch(uploadEmployeeData(formData, () => {
                        dispatch(fetchEmployeesList(query))
                        toggleModal(false)
                    }))}} 
                    modalTitle="Upload Employee CSV">
                    <Input type="file" accept={['.csv']} onChange={handleFileChange} />
                </FileUploadModal>
            </CardContainer>
     );
}
 
export default EmployeeList;