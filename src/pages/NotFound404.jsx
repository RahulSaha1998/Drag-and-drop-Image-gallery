import { Link } from "react-router-dom";
import notFound from "/images/error-404-Page.gif"

const NotFound404 = () => {
    return (
        <div>
        <Link to={'/'}>
            <img className="w-full" src={notFound} alt="" />

        </Link>
    </div>
    );
};

export default NotFound404;