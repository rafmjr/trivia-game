import React from 'react';
import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
    CLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

// routes config
import routes from '../routes';

import { TheHeaderDropdown } from './index';

const TheHeader = () => {
    return (
        <CHeader withSubheader>
            <CToggler inHeader className="ml-md-3 d-lg-none" />
            <CToggler inHeader className="ml-3 d-md-down-none" />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CIcon name="logo" height="48" alt="Logo" />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                {/* TODO: put logo here */}
                <CHeaderNavItem className="px-3">
                    <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <TheHeaderDropdown />
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
                <div className="d-md-down-none mfe-2 c-subheader-nav">
                    {/* TODO: change breadcrumbs as user navigates */}
                    <CLink className="c-subheader-nav-link" aria-current="page" to="/dashboard">
                        <CIcon name="cil-graph" alt="Dashboard" />
                        &nbsp;Dashboard
                    </CLink>
                </div>
            </CSubheader>
        </CHeader>
    );
};

export default TheHeader;
