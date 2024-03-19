import { Navbar, Nav, Container, NavDropdown, Badge, } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.jpg';
import { resetCart } from '../slices/cartSlice';
import { ListGroup } from 'react-bootstrap';
import '../css/ListGroupItem.css';
import '../css/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const menuItem = {
    width: '100%',
    fontWeight: 'bold',
    fontSize: '20px',
    borderTop: '0px',
    borderBottom: '0px',
    borderRadius: '0px',
    paddingTop: '0.2rem',
    paddingBottom: '0.2rem',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar style={{ color: '#fff' }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='Scentique' width='100px' height='25%' />
              {/* Scentique */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart' style={{ color: '#7b8a8b' }}>
                <Nav.Link >
                  <FaShoppingCart /> Giỏ hàng
                  {cartItems.length > 0 && (
                    <Badge pill bg='dark' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username' >
                    <LinkContainer to='/profile' style={{ color: '#7b8a8b' }}>
                      <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login' style={{ color: '#7b8a8b' }}>
                  <Nav.Link style={{ color: '#7b8a8b' }}>
                    <FaUser /> Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist' style={{ color: '#7b8a8b' }}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist' style={{ color: '#7b8a8b' }}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist' style={{ color: '#7b8a8b' }}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar>
        <Container>
          <ListGroup horizontal style={{ width: '100%' }}>
            <ListGroup.Item style={menuItem} >
              <Link to={`/product/65af32b588d0dd257b76cebe`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', }}>Nến vỏ tre</Link>
            </ListGroup.Item>
            <ListGroup.Item style={menuItem}>
              <NavDropdown
                title="Nến cốc thuỷ tinh"

              >
                <NavDropdown.Item href="#action3">
                  Nến thơm không khói cốc thuỷ tinh 35G
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/65af34e588d0dd257b76ced6">
                  Nến thơm cao cấp không khói cốc thuỷ tinh 260G
                </NavDropdown.Item>
              </NavDropdown>
            </ListGroup.Item>
            <ListGroup.Item style={menuItem}>
              <Link to={`/product/65af398488d0dd257b76cfb1`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', }}>Nến Tealight</Link>
            </ListGroup.Item>
            <ListGroup.Item style={menuItem}>
              <NavDropdown
                title="Nến Bánh Sinh Nhật"

              >
                <NavDropdown.Item href="/product/65af802db58ad868872be70d">
                  Nến thơm bánh sinh nhật cao cấp 160G
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/65af35ca88d0dd257b76cf0a">
                  Nến thơm hình bánh macarons nhiều màu
                </NavDropdown.Item>
              </NavDropdown>
            </ListGroup.Item>
            <ListGroup.Item style={menuItem}>
              <NavDropdown
                title="Phụ Kiện"

              >
                <NavDropdown.Item href="/product/65f52a8eb6055fff88e13e86" >
                  Kéo cắt bấc nến thơm bằng thép không gỉ
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/65f52b7fb6055fff88e13e87" >
                  Dụng cụ thắp nến thơm sạc bằng USB
                </NavDropdown.Item>
              </NavDropdown>
            </ListGroup.Item>
          </ListGroup>
        </Container>

      </Navbar>
    </header>
  );
};

export default Header;
