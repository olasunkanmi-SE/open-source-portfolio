import Modal from "react-bootstrap/Modal";
import SearchComponent from "./Search";

interface ISearchModal {
  show: boolean;
  onHide: () => void;
}

export const SearchModal = ({ show, onHide }: ISearchModal) => {
  return (
    <div>
      <Modal style={{ zIndex: 99999 }} show={show} onHide={onHide} size="lg">
        <Modal.Body>
          <SearchComponent show={show} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
