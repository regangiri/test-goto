import styled from "@emotion/styled";
import { ArrowBackIos } from "@mui/icons-material";
import { useRouter } from "next/router";
import React from "react";

interface IBackNavigation {
  isBack?: boolean;
  customFunc?: () => void;
  title?: string;
}

const BackNavigationNav = styled.div`
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const BackNavigationChild = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  margin: 0 16px;
  background: white;
`;

const NavTitle = styled.span`
  margin: 0 12px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
`;

const BackButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  left: -2px;
`;

const BackNavigation = ({
  isBack = false,
  customFunc,
  title,
}: IBackNavigation) => {
  const router = useRouter();

  return (
    <BackNavigationNav>
      <BackNavigationChild>
        {isBack && (
          <BackButton>
            <ArrowBackIos
              fontSize="medium"
              onClick={() => customFunc ?? router.back()}
            />
          </BackButton>
        )}
        <NavTitle>{title}</NavTitle>
      </BackNavigationChild>
    </BackNavigationNav>
  );
};

export default BackNavigation;
