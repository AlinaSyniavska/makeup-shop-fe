import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "rsuite/";
import "rsuite/dist/rsuite.min.css";

import style from "./Header.module.css";

const Header: FC = () => {
  return (
    <React.Fragment>
      <Nav className={style.headerContainer}>
        <Nav.Item as={NavLink} to={"/home"}>
          Home
        </Nav.Item>

        <Nav.Menu title="Category" className={style.multiMenu}>
          <Nav.Menu title="Cream" className={style.fs18}>
            <Nav.Item
              as={NavLink}
              to={"/category/cream/face"}
              style={{ fontSize: "18px", padding: "10px", width: "100px" }}
            >
              Face
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              to={"/category/cream/body"}
              style={{ fontSize: "18px", padding: "10px" }}
            >
              Body
            </Nav.Item>
          </Nav.Menu>
          <Nav.Item
            as={NavLink}
            to={"/category/eyebrow"}
            style={{
              fontSize: "18px",
              lineHeight: "40px",
              textAlign: "left",
              paddingLeft: "12px",
            }}
          >
            Eyebrow
          </Nav.Item>
          <Nav.Menu title="Eyeshadow" className={style.fs18}>
            <Nav.Item
              as={NavLink}
              to={"/category/eyeshadow/palette"}
              style={{ fontSize: "18px", padding: "10px", width: "100px" }}
            >
              Palette
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              to={"/category/eyeshadow/pencil"}
              style={{ fontSize: "18px", padding: "10px", width: "100px" }}
            >
              Pencil
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              to={"/category/eyeshadow/cream"}
              style={{ fontSize: "18px", padding: "10px", width: "100px" }}
            >
              Cream
            </Nav.Item>
          </Nav.Menu>
          <Nav.Item
            as={NavLink}
            to={"/category/powder"}
            style={{
              fontSize: "18px",
              lineHeight: "40px",
              textAlign: "left",
              paddingLeft: "12px",
            }}
          >
            Powder
          </Nav.Item>
          <Nav.Menu title="Lipstick" className={style.fs18}>
            <Nav.Item
              as={NavLink}
              to={"/category/lipstick/lipstick"}
              style={{ fontSize: "18px", padding: "10px" }}
            >
              Lipstick
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              to={"/category/lipstick/lipgloss"}
              style={{ fontSize: "18px", padding: "10px" }}
            >
              Lip gloss
            </Nav.Item>
          </Nav.Menu>
          <Nav.Item
            as={NavLink}
            to={"/category/mascara"}
            style={{
              fontSize: "18px",
              lineHeight: "40px",
              textAlign: "left",
              paddingLeft: "12px",
            }}
          >
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
