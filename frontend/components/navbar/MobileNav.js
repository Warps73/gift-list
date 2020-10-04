import React, {Fragment} from 'react';
import SideBar from "../sidebar/SideBar";
import styled from 'styled-components';


const PageWrap = styled.div`
text-align: center;
  overflow: auto;
  top: 45%;
  position: relative;
`
const MobileNav = () => {
    return (
        <Fragment>
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
            <PageWrap/>
        </Fragment>
    );
}

export default MobileNav;
