import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationBar() {
  return (
    <Navbar
      fixed="top"
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #1a237e 0%, #283593 100%)",
        padding: "10px 20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#home" style={{ 
          color: "#fff", 
          fontWeight: "700",
          fontSize: "1.5rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }}>
          Logo Spark
        </Navbar.Brand>
        
        <Nav className="mx-auto d-flex align-items-center">
          <Nav.Link href="#logomaker" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Logo Maker</Nav.Link>
          <Nav.Link href="#documentation" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Documentation</Nav.Link>
          <Nav.Link href="#brandkit" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Brand Kit</Nav.Link>
          <Nav.Link href="#logoideas" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Logo Ideas</Nav.Link>
          <Nav.Link href="#Pricing" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Pricing</Nav.Link>
          <Nav.Link href="#blog" className="mx-2" style={{ 
            color: "#E8EAF6", 
            fontWeight: "500",
            transition: "color 0.2s ease"
          }}>Blog</Nav.Link>
        </Nav>
        
        <Nav>
          <Nav.Link 
            href="#login" 
            style={{ 
              color: "#E8EAF6", 
              marginRight: "15px",
              fontWeight: "500",
              transition: "color 0.2s ease"
            }}
          >
            Login
          </Nav.Link>
          <Nav.Link 
            href="#register" 
            style={{ 
              backgroundColor: "#FF4081", 
              color: "white", 
              padding: "8px 20px", 
              borderRadius: "4px",
              fontWeight: "600",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease"
            }}
            className="d-flex align-items-center justify-content-center"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#F50057"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FF4081"}
          >
            Register
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}