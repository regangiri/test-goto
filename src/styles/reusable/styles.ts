import styled from "@emotion/styled";

interface IFlexContainer {
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
}

export const FlexContainer = styled.div<IFlexContainer>`
  display: flex;
  align-items: ${({ alignItems, direction }) =>
    alignItems || (direction === "column" ? "flex-start" : "center")};
  justify-content: ${({ justifyContent, direction }) =>
    justifyContent || (direction === "column" ? "center" : "flex-start")};
  flex-direction: ${({ direction }) => direction || "row"};
`;
