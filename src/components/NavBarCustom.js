"use client";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { recentlyViewedAtom } from "./CitiesSearch";
import { useAtom } from "jotai";

export default function NavBarCustom() {
  const [recentlyViewed] = useAtom(recentlyViewedAtom);

  return (
    <Navbar expand="lg">
      <div className="container-fluid">
        <Navbar.Brand as={Link} href="/">
          HUSE | Weather
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <NavDropdown title="Visited Cities" id="basic-nav-dropdown">
              {Object.keys(recentlyViewed).length > 0 ? (
                Object.values(recentlyViewed).map((city, index) => (
                  <NavDropdown.Item
                    as={Link}
                    href={`/cities/${city.id}`}
                    key={index}
                  >
                    {city.name}, {city.sys.country}
                  </NavDropdown.Item>
                ))
              ) : (
                <span className="p-2">No history</span>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
