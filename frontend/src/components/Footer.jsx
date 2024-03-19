// import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from 'react-icons/bs';
const Footer = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className='bg-dark'>
        <footer className='py-4'>
          <div className='container-xxl'>
            <div className='row align-items-center'>
              <div className='col-5'>
                <div className='footer-top-data d-flex gap-30 align-items-center'>
                  <h2 className='mb-0 text-white'>Đăng ký để nhận Bản Tin</h2>
                </div>
              </div>
              <div className='col-7'>
                <div class='input-group'>
                  <input
                    type='text'
                    className='form-control py-1'
                    placeholder='Your Email...'
                    aria-label='Search Products Here...'
                    aria-describedby='basic-addon2'
                  />
                  <span className='input-group-text p-1' id='basic-addon2'>
                    ĐẶT MUA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className='py-4'>
          <div className='container-xxl'>
            <div className='row'>
              <div className='col-4'>
                <h4 className='text-white mb-4'>Liên hệ chúng tôi</h4>
                <div>
                  <address className='text-white fs-6'>
                    Hno: 436 Ton Duc Thang Đường,
                    <br /> Lien Chieu Huyện,
                    <br /> Danang Thành phố <br />
                    PinCode: 55000
                  </address>
                  <a
                    href='tel: +84 868004317'
                    className='mt-3 d-block mb-1 text-white'
                  >
                    +84 868004317
                  </a>
                  <a href='mailto:' className='mt-2 d-block mb-0 text-white'>
                    Scentique@gmail.com
                  </a>
                  <div className='social-icons d-flex align-items-center gap-30 mt-4'>
                    <a className='text-white' href='/'>
                      <BsLinkedin className='fs-5' />
                    </a>
                    <a className='text-white' href='/'>
                      <BsGithub className='fs-5' />
                    </a>
                    <a className='text-white' href='/'>
                      <BsYoutube className='fs-5' />
                    </a>
                    <a className='text-white' href='/'>
                      <BsInstagram className='fs-5' />
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <h4 className='text-white mb-4'>Thông tin</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Chính sách bảo mật</Link>
                  <Link className='text-white py-2 mb-1'>Chính sách hoàn tiền</Link>
                  <Link className='text-white py-2 mb-1'>Chính sách vận chuyển</Link>
                  <Link className='text-white py-2 mb-1'>
                    Điều khoản & Điều kiện
                  </Link>
                  <Link className='text-white py-2 mb-1'>Blogs</Link>
                </div>
              </div>
              <div className='col-3'>
                <h4 className='text-white mb-4'>Tài khoản</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>About Us</Link>
                  <Link className='text-white py-2 mb-1'>Faq</Link>
                  <Link className='text-white py-2 mb-1'>Liên hệ</Link>
                </div>
              </div>
              <div className='col-2'>
                <h4 className='text-white mb-4'>Quick Links</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Scented Candles</Link>
                  <Link className='text-white py-2 mb-1'>Mini Candles</Link>
                  <Link className='text-white py-2 mb-1'>...</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className='py-4'>
          <div className='container.xxl'>
            <div className='row'>
              <div className='col-12'>
                <p className='text-center mb-0 text-white'>
                  &copy; {new Date().getFullYear()}; Powered by Developer's
                  Scentique
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Scentique &copy; {currentYear}</p>f
          </Col>
        </Row>
      </Container> */}
    </footer>
  );
};
export default Footer;
