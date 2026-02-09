import styled from "styled-components";
import {Pagination} from "antd";

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 1.5vw, 2.5rem);
`

export const  Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: clamp(1rem, 2vw, 3rem) clamp(1.5rem, 6vw, 4rem);
  margin: 0 auto;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Actions = styled.div`
    flex-shrink: 0;
`;

export const StyledPagination = styled(Pagination)`
    width: 20vw;
    margin: 0 auto;
`
