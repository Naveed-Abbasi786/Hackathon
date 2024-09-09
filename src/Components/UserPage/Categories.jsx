import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from 'react-bootstrap';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer', backgroundColor: 'green', padding: '7px 16px', color: 'black' }} // Fix for backgroundColor and padding
  >
    <MenuIcon style={{ marginRight: '6px' }} /> {/* Replacing default arrow with MenuIcon */}
    All Jobs
  </Button>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

export default function CustomDropdown() {
  // Handle item select to trigger custom functions
  const handleSelect = (eventKey) => {
    switch (eventKey) {
      case '1':
        console.log("Frontend developer selected");
        break;
      case '2':
        console.log("Backend developer selected");
        break;
      case '3':
        console.log("UI/UX designer selected");
        break;
      case '4':
        console.log("Graphic designer selected");
        break;
      default:
        console.log("Unknown category");
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-secondary" as={CustomToggle} id="dropdown-custom-components">
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1">Frontend developer</Dropdown.Item>
        <Dropdown.Item eventKey="2">Backend developer</Dropdown.Item>
        <Dropdown.Item eventKey="3">UI/UX designer</Dropdown.Item>
        <Dropdown.Item eventKey="4">Graphic designer</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
