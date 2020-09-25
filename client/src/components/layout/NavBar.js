import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const the2000s = [
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
  ];

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: "",
      user: "",
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  return (
    <div>
      <Navbar variant="dark">
        <Navbar.Brand className="nav-logo" href="/">
          Nostalgia Now
        </Navbar.Brand>
        <Nav className="mr-auto">
          {userData.user ? (
            <>
              <NavDropdown title="2000s" id="basic-nav-dropdown">
                {the2000s.map((year) => {
                  return (
                    <NavDropdown.Item href={`/songYear/${year}`}>
                      {year}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Nav.Link href="/popular">All Time</Nav.Link>
              <Nav.Link href="/compareCharts">Compare Decades</Nav.Link>
            </>
          ) : (
            <></>
          )}
        </Nav>
        <Form inline>
          {/* Render signup/signin buttons vs signout button depending on if a user is authenticated or not  */}
          {/* A not signed in user should see the signup/signin buttons */}
          {/* A signed in user should see the signout button instead */}

          {userData.user ? (
            <>
              <Link to={`/user/${userData.user.username}`}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="3x"
                  style={{ color: "white", marginLeft: 10, marginRight: 10 }}
                />
              </Link>
              <Button
                style={{ margin: 10 }}
                onClick={logout}
                variant="outline-info"
              >
                Log Out
              </Button>
            </>
          ) : (
            <div>
              <Button
                style={{ margin: 10 }}
                onClick={register}
                variant="outline-info"
              >
                Sign Up
              </Button>

              <Button
                style={{ margin: 10 }}
                onClick={login}
                variant="outline-info"
              >
                Sign In
              </Button>
            </div>
          )}
        </Form>
      </Navbar>
    </div>
  );
}
