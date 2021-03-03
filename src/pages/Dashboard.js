// TODO: Add login screen
// TODO: Update score on cell change
import React, { useEffect, useRef, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Spreadsheet from 'react-spreadsheet';

import { getActivities, deleteActivity, getTeams } from '../http/api';
import { useRouteMatch, useHistory } from 'react-router-dom';

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

const fields = ['question', 'actions'];

const Dashboard = () => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const [activities, setActivities] = useState([]);
    const [teams, setTeams] = useState([]);
    const teamsRef = useRef();

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

    const data = [
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

    function handleCellCommit(prevCell, newCell, position) {
        if (!prevCell || !newCell) {
            console.log('Unsupported operation', prevCell, newCell, position);
            return;
        }

        const { row, column } = position;
        const solution = newCell.value;
        teamsRef.current[column - 2].results[row].solution = solution;
        setTeams(teamsRef.current);
    }

    return (
        <>
            {/* Results Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h4 id="traffic" className="card-title mb-0">
                                Results
                            </h4>
                            <div className="small text-muted">{teams.length} results</div>
                        </CCardHeader>
                        <CCardBody style={{ overflow: 'scroll' }}>
                            <Spreadsheet data={data} onCellCommit={handleCellCommit} />
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
                                <CIcon name="cil-pencil" />
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
                            question: (item) => (
                                <td
                                    className="clickable-row"
                                    onClick={() => history.push(`${url}/activities/${item._id}`)}
                                >
                                    {item.question}
                                </td>
                            ),
                            actions: (item) => (
                                <td>
                                    <CButton onClick={() => handleDelete({ _id: item._id })} color="danger">
                                        Delete
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
