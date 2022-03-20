import {Link} from 'react-router-dom'

export const NavBar = () => {
    return(
        <div className="navbar">
            <div className="navbar-item">
                <Link to="/">
                    <h3>Weather Forecast</h3>
                </Link>
            </div>
            <div className="navbar-item">
                <Link to="/forecast">
                    <button className="btn btn-primary">
                        Weather Forecast
                    </button>
                </Link>
            </div>
            <div className="navbar-item">
                <Link to="/favorites">
                    <button className="btn btn-primary">
                        Favorite Cities
                    </button>
                </Link>
            </div>
        </div>
    )
}