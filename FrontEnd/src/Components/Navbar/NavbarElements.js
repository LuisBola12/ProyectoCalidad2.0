import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #133c54;
  height:80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw-1000px)/2);
  z-index: 10;
  @media screen and (max-width: 768px) {
    flex-direction:column;
  }
`;

export const NavLink = styled(Link)`
  width: 240px;
  justify-content: center;
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  &.active {
    margin-top: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 70%;
    color: #133c54;
    font-weight: bolder;
    background: #fff;
    font-size: 18px;
    &:hover {
      color: #133c54;
      font-size: 18px;
    }
  }
  &:hover {
    color: #fff;
    font-size: 18px;
  }
  // border: solid red;
`;

export const NavMenu = styled.div`
  display: flex;
  // border: solid red;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction:column;
  }
`;
