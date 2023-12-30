import React from 'react'
import { NavLink, Link } from "react-router-dom";
// import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
// import { Badge } from 'antd';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");
    }
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -2,
            top: 3,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
      <>
        <nav className="navbar navbar-expand-lg p-3">
          <div className="container-fluid">
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse navbar-main-div"
              id="navbarTogglerDemo01"
            >
              <Link to="/" className="navbar-brand" href="#">
                {" "}
                🛒WatchCart
              </Link>
              <SearchInput />
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item p-3" to={"/categories"}>
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item p-3"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {!auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="nav-item dropdown"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={`https://watchcart-backend.onrender.com/api/v1/auth/get-photo/${auth?.user?._id}`}
                      />
                      <Link
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user.name}
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth.user.role === 0 ? "user" : "admin"
                            }`}
                            className="dropdown-item p-3"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item p-3"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <li className="nav-item cart-header">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cart?.length} color="secondary">
                      <ShoppingCartIcon
                        onClick={() => navigate("/cart")}
                        style={{ color: "white" }}
                      />
                    </StyledBadge>
                  </IconButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
}

export default Header
