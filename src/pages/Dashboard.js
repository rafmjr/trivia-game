import React, { useEffect, useRef, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLoopCircular, cilPencil, cilTrash, cilPlus } from '@coreui/icons';
import Spreadsheet from 'react-spreadsheet';

import { getActivities, deleteActivity, getTeams, deleteResults } from '../http/api';
import { useRouteMatch, useHistory } from 'react-router-dom';

const fields = ['question', 'actions'];

const BoldedView = ({ cell }) => <span style={{ fontWeight: 'bold' }}>{cell.value}</span>;

const AnswerView = (answer) => ({ cell }) => (
    <div style={{ backgroundColor: cell.value === answer ? 'green' : 'red', color: 'white' }}>{cell.value}</div>
);

const AnswerEdit = ({ cell, onChange }) => (
    <div class="Spreadsheet__data-editor">
        <input
            type="text"
            onChange={(e) => {
                onChange({ ...cell, value: e.target.value });
            }}
            value={cell.value}
        />
    </div>
);

const makeResultsMatrix = (teams, activities) => [
    [
        { value: 'Question', DataViewer: BoldedView },
        { value: 'Answer', DataViewer: BoldedView },
        ...teams.map((team) => ({ value: team.name, DataViewer: BoldedView })),
    ],
    ...activities.map((activity, index) => [
        { value: `Question ${index + 1}` },
        { value: activity.solution },
        ...teams.map((team) => ({
            value: team.results[index] ? team.results[index].solution : null,
            DataViewer: AnswerView(activity.solution),
            DataEditor: AnswerEdit,
        })),
    ]),
    [
        { value: null },
        { value: 'Total', DataViewer: BoldedView },
        ...teams.map((team) => ({
            value: activities.reduce((carry, activity, index) => {
                const solution = team.results[index] ? team.results[index].solution : null;
                return solution === activity.solution ? carry + 1 : carry;
            }, 0),
        })),
    ],
];

const Dashboard = () => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const [activities, setActivities] = useState([]);
    const [teams, setTeams] = useState([]);
    const teamsRef = useRef();

    const data = makeResultsMatrix(teams, activities);

    useEffect(() => {
        fetchActivities();
        fetchTeams();
    }, []);

    async function fetchActivities() {
        const { data } = await getActivities();
        setActivities(data.activities || []);
    }

    async function fetchTeams() {
        const { data } = await getTeams();
        teamsRef.current = data.teams;
        setTeams(data.teams || []);
    }

    async function handleDelete({ _id }) {
        await deleteActivity({ _id });
        fetchActivities();
    }

    async function handleClear() {
        await deleteResults();
        fetchActivities();
        fetchTeams();
    }

    return (
        <>
            {/* Results Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol sm="5">
                                    <h4 id="traffic" className="card-title mb-0">
                                        Results
                                    </h4>
                                    <div className="small text-muted">{teams.length} results</div>
                                </CCol>
                                <CCol sm="7" className="d-none d-md-block">
                                    <CButton color="success" className="float-right" onClick={handleClear}>
                                        <CIcon content={cilLoopCircular} />
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody style={{ overflow: 'scroll' }}>
                            <Spreadsheet data={data} />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Activities Table */}
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="5">
                            <h4 id="traffic" className="card-title mb-0">
                                Activities
                            </h4>
                            <div className="small text-muted">{activities.length} activities</div>
                        </CCol>
                        <CCol sm="7" className="d-none d-md-block">
                            <CButton
                                color="success"
                                className="float-right"
                                onClick={() => history.push(`${url}/activities/create`)}
                            >
                                <CIcon content={cilPlus} />
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={activities}
                        fields={fields}
                        bordered
                        hover
                        itemsPerPage={5}
                        pagination
                        scopedSlots={{
                            question: (item) => <td>{item.question}</td>,
                            actions: (item) => (
                                <td>
                                    <CButton onClick={() => history.push(`${url}/activities/${item._id}`)} color="info">
                                        <CIcon content={cilPencil} />
                                    </CButton>
                                    &nbsp;
                                    <CButton onClick={() => handleDelete({ _id: item._id })} color="danger">
                                        <CIcon content={cilTrash} />
                                    </CButton>
                                </td>
                            ),
                        }}
                    />
                </CCardBody>
            </CCard>
        </>
    );
};

export default Dashboard;
