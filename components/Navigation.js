import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export default () => {
  const router = useRouter();
  return (
    <Navbar fluid>
      <Link href="/">
        <Navbar.Brand className="navigation_brand">FabLab Genk</Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="ml-auto">
          <Link href="/machines" passHref>
            <Nav.Link
              className={classNames({
                navigation_active: router.pathname === "/machines",
              })}
            >
              Machines
            </Nav.Link>
          </Link>
          <Link href="/materiaal_prijzen" passHref>
            <Nav.Link
              className={classNames({
                navigation_active: router.pathname === "/materiaal_prijzen",
              })}
            >
              Materiaal & prijzen
            </Nav.Link>
          </Link>
          <Link href="/fabmoments" passHref>
            <Nav.Link
              className={classNames({
                navigation_active: router.pathname === "/fabmoments",
              })}
            >
              Fabmoments
            </Nav.Link>
          </Link>
          <NavDropdown title="Info" id="collasible-nav-dropdown">
            <Link href="/info/fablab" passHref>
              <NavDropdown.Item
                className={classNames({
                  navigation_active: router.pathname === "/info/fablab",
                })}
              >
                FabLab?
              </NavDropdown.Item>
            </Link>
            <Link href="/info/huisregels" passHref>
              <NavDropdown.Item
                className={classNames({
                  navigation_active: router.pathname === "/info/huisregels",
                })}
              >
                Huisregels
              </NavDropdown.Item>
            </Link>
            <Link href="/info/faq" passHref>
              <NavDropdown.Item
                className={classNames({
                  navigation_active: router.pathname === "/info/faq",
                })}
              >
                FAQ
              </NavDropdown.Item>
            </Link>
            <Link href="/info/stages" passHref>
              <NavDropdown.Item
                className={classNames({
                  navigation_active: router.pathname === "/info/stages",
                })}
              >
                Stages
              </NavDropdown.Item>
            </Link>
          </NavDropdown>
          <Link href="/contact" passHref>
            <Nav.Link
              className={classNames({
                navigation_active: router.pathname === "/contact",
              })}
            >
              Contact
            </Nav.Link>
          </Link>
          <Link href="/login" passHref>
            <Nav.Link
              className={classNames({
                navigation_active: router.pathname === "/login",
              })}
            >
              Login
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
