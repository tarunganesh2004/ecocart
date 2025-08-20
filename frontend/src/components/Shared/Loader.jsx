import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader