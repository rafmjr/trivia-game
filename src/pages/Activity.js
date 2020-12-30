import React, { useState, useEffect, useRef } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CInputFile,
    CInputCheckbox,
    CLabel,
    CInputGroup,
    CInputGroupAppend,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useParams } from 'react-router-dom';
import { getActivityById, createActivity, updateActivity } from '../http/api';
import { host } from '../config/api';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

function Activity() {
    const { _id } = useParams();
    const pictureInput = useRef(null);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [picture, setPicture] = useState('');
    const [isOpenQuestion, setIsOpenQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // TODO: avoid reusing this component for create and updating entity, maybe use composition?
        if (!_id || question) return;
        fetchActivity();
    });

    async function fetchActivity() {
        setIsLoading(true);
        const {
            data: { activity },
        } = await getActivityById(_id);
        setIsOpenQuestion(!activity.answers.length);
        setQuestion(activity.question);
        setAnswers(activity.answers);
        setPicture(activity.picture);
        setIsLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!_id) {
            const {
                data: { activity },
            } = await createActivity({
                question,
                answers: isOpenQuestion ? [] : answers,
                picture: pictureInput.current.files[0] || picture,
            });
            window.location.href = `/dashboard/activities/${activity._id}`;
        } else {
            await updateActivity({
                _id,
                question,
                answers: isOpenQuestion ? [] : answers,
                picture: pictureInput.current.files[0] || picture,
            });
            fetchActivity();
        }
    }

    return isLoading ? (
        loading
    ) : (
        <CCard>
            <CForm className="form-horizontal" onSubmit={handleSubmit}>
                <CCardHeader>Activity</CCardHeader>
                <CCardBody>
                    {/* Question Field */}
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="question">Question</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Enter question..."
                            />
                        </CCol>
                    </CFormGroup>

                    {/* Option Fields */}
                    {!isOpenQuestion &&
                        answers.map((option, index) => (
                            <CFormGroup row key={option + index}>
                                <CCol md="3">{index === 0 && <CLabel htmlFor="email-input">Answers</CLabel>}</CCol>
                                <CCol xs="12" md="9">
                                    <CInputGroup>
                                        <CInput
                                            defaultValue={option}
                                            onBlur={(e) => {
                                                const newAnswers = answers.slice();
                                                newAnswers[index] = e.target.value;
                                                setAnswers(newAnswers.filter(Boolean));
                                            }}
                                            placeholder="Enter answer"
                                        />
                                        <CInputGroupAppend>
                                            <CButton
                                                size="sm"
                                                color="secondary"
                                                onClick={() => {
                                                    const newAnswers = answers.slice();
                                                    delete newAnswers[index];
                                                    setAnswers(newAnswers.filter(Boolean));
                                                }}
                                            >
                                                <CIcon name="cil-x" />
                                            </CButton>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CFormGroup>
                        ))}

                    {/* New Answer Field */}
                    {!isOpenQuestion && (
                        <CFormGroup row>
                            <CCol md="3"></CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    onBlur={(e) => {
                                        const newAnswers = answers.slice();
                                        newAnswers.push(e.target.value);
                                        e.target.value = '';
                                        setAnswers(newAnswers.filter(Boolean));
                                    }}
                                    placeholder="Enter answer"
                                />
                            </CCol>
                        </CFormGroup>
                    )}

                    {/* Clear Options Field */}
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel>Open Question</CLabel>
                        </CCol>
                        <CCol md="9">
                            <CFormGroup variant="custom-checkbox" inline>
                                <CInputCheckbox
                                    custom
                                    id="is-open-question"
                                    checked={isOpenQuestion}
                                    onChange={(e) => setIsOpenQuestion(e.target.checked)}
                                />
                                <CLabel variant="custom-checkbox" htmlFor="is-open-question">
                                    Clear Options
                                </CLabel>
                            </CFormGroup>
                        </CCol>
                    </CFormGroup>

                    {/* File Input Field */}
                    <CFormGroup row>
                        <CLabel col md="3" htmlFor="file-input">
                            File input
                        </CLabel>
                        <CCol xs="12" md="9">
                            {picture && (
                                <div style={{ width: '100%', maxWidth: '500px' }}>
                                    <img src={`${host}/${picture}`} alt="activity" />
                                </div>
                            )}
                            <CInputFile innerRef={pictureInput} id="file-input" name="file-input" />
                        </CCol>
                    </CFormGroup>
                </CCardBody>

                {/* Action Buttons */}
                <CCardFooter>
                    <CButton type="submit" size="sm" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                    </CButton>
                </CCardFooter>
            </CForm>
        </CCard>
    );
}

export default Activity;
