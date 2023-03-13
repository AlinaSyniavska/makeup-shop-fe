import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "rsuite/";
import "rsuite/dist/rsuite.min.css";

import style from "./Header.module.css";
const navItemStyle = {fontSize: "18px", padding: "10px", width: "100px"};
const navSingleItemStyle = {fontSize: "18px", lineHeight: "40px", paddingLeft: "12px"};

const Header: FC = () => {
  return (
    <React.Fragment>
      <Nav className={style.headerContainer}>
        <Nav.Item as={NavLink} to={"/home"}>
          Home
        </Nav.Item>

        <Nav.Menu title="Category" className={style.multiMenu}>

          <Nav.Menu title="Cream" className={style.fs18}>
            <Nav.Item as={NavLink} to={"/category/cream/face"} style={navItemStyle}>
              Face
            </Nav.Item>
            <Nav.Item as={NavLink} to={"/category/cream/body"} style={navItemStyle}>
              Body
            </Nav.Item>
          </Nav.Menu>

          <Nav.Item as={NavLink} to={"/category/eyebrow"} style={{...navSingleItemStyle, textAlign: 'left'}}>
            Eyebrow
          </Nav.Item>

          <Nav.Menu title="Eyeshadow" className={style.fs18}>
            <Nav.Item as={NavLink} to={"/category/eyeshadow/palette"} style={navItemStyle}>
              Palette
            </Nav.Item>
            <Nav.Item as={NavLink} to={"/category/eyeshadow/pencil"} style={navItemStyle}>
              Pencil
            </Nav.Item>
            <Nav.Item as={NavLink} to={"/category/eyeshadow/cream"} style={navItemStyle}>
              Cream
            </Nav.Item>
          </Nav.Menu>

          <Nav.Item as={NavLink} to={"/category/powder"} style={{...navSingleItemStyle, textAlign: 'left'}}>
            Powder
          </Nav.Item>

          <Nav.Menu title="Lipstick" className={style.fs18}>
            <Nav.Item as={NavLink} to={"/category/lipstick/lipstick"} style={navItemStyle}>
              Lipstick
            </Nav.Item>
            <Nav.Item as={NavLink} to={"/category/lipstick/lipgloss"} style={navItemStyle}>
              Lip gloss
            </Nav.Item>
          </Nav.Menu>

          <Nav.Item as={NavLink} to={"/category/mascara"} style={{...navSingleItemStyle, textAlign: 'left'}}>
            Mascara
          </Nav.Item>

        </Nav.Menu>

        <Nav.Item href={"/auth/login"}>Login</Nav.Item>
        <Nav.Item href={"/auth/register"}>Register</Nav.Item>
      </Nav>
    </React.Fragment>
  );
};

export { Header };
