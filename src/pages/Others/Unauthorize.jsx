import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this page</p>
            <button onClick={goBack}>
                Goback
            </button>
        </div>
    )
}

export default Unauthorized;