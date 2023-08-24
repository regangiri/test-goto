import BackNavigation from "@/components/BackNavigation";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface IDefaultLayout {
  children?: ReactNode;
  isBack?: boolean;
  title?: string;
  customFunc?: () => void;
}

const DefaultLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  position: relative;
`;

const MobileCenteredContent = styled.div`
  max-width: 480px;
  width: 100%;
`;

const DefaultLayout = ({
  children,
  isBack,
  title,
  customFunc,
}: IDefaultLayout) => {
  return (
    <DefaultLayoutContainer>
      <MobileCenteredContent>
        <BackNavigation isBack={isBack} title={title} customFunc={customFunc} />
        {children}
      </MobileCenteredContent>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
