import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../components/routes/AdminRoute";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "antd";

const applicantIndex = () => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        loadApplicants();
        // console.log(loadUsers())
        }, []);
    
        const loadApplicants = async () => {
          const { data } = await axios.get("/api/applicants");
          setApplicants(data);
        //   console.log(data, "datadatata");
        };

        const handleSubmit = async (email) => {
            // e.preventDefault()
            try {
              let { approvedApplicant } = await axios.post("/api/approved-applicant",
                   { email }
            );
            console.log(approvedApplicant, "approvedApplicant");
            } catch (err) {
                console.log(err);
            }
        }
    return (
        <AdminRoute>
          <h1 className="jumbotron text-center square">Applicants</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants &&
                        applicants.map((applicant, index) => (
                            <tr>
                            <td>{index + 1}</td>
                            {/* <td>{applicant._id}</td> */}
                            <td>{applicant.email}</td>
                            <td>{applicant.phone}</td>
                            <td>{applicant.website}</td>
                            <td>
                                <button type="submit" className="btn btn-raised" value={applicant._id} onClick={() => handleSubmit(applicant.email)}>Approve</button>
                            </td>
                            </tr>
                            )
                        )
                    }
                </tbody>
            </Table>    
       
        </AdminRoute>
      );
}

export default applicantIndex;