import { Form, InputGroup, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const ProductSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchbar-wrapper py-4">
      <Container className="d-flex justify-content-center">
        <div className="searchbar-box w-100">
          <InputGroup className="searchbar-group">
            <InputGroup.Text className="searchbar-icon">
              <Search />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Cerca marca, modello, targa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchbar-input"
            />
          </InputGroup>
        </div>
      </Container>
    </div>
  );
};

export default ProductSearchBar;
