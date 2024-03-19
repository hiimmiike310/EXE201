import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { FaCaretLeft } from 'react-icons/fa';
import '../css/Product.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productType, setProductType] = useState(null);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty, productType }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const changeText = (text) => {
    const doc = text;
    return doc.replace(/\n/g, "<br>");
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/' style={{ color: '#7b8a8b' }}>
        <FaCaretLeft style={{ marginBottom: '3px', color: '#7b8a8b' }} />
        Trở lại
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3} style={{ height: 'fit-content' }}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <>
                    {product.type != null && product.type !== '' ? product.type.map((type) => (<Button key={type} className={productType === type ? 'buttonType selected' : 'buttonType'} onClick={() => { setProductType(type) }}> {type}</Button>)) : ""}
                  </>
                  {/* <Button className='buttonType'>fdsfdsfsd</Button>
                  <Button className='buttonType'>fdsfdsfsd</Button>
                  <Button className='buttonType'>fdsfdsfsd</Button> */}
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <h4> Mô Tả:</h4>
                  {product.description}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
            <Col md={3} style={{ height: 'fit-content' }}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Thành Tiền:</Col>
                      <Col>
                        <Row>
                          <strong style={{ color: 'red' }}>
                            {product.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}{' '}
                            VND
                          </strong>
                        </Row>
                        <Row>
                          <strong style={{ textDecoration: 'line-through', lineHeight: '26px' }}>
                            {(product.price * 2).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}{' '}
                            VND
                          </strong>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Trạng Thái:</Col>
                      <Col style={{ fontWeight: 'bold' }}>
                        {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Số Lượng: </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      style={{ background: '#aa3333', fontWeight: 'bolder' }}
                    >
                      Thêm Vào Giỏ Hàng
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <Tabs
                id="controlled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Thông tin chi tiết">
                  <p dangerouslySetInnerHTML={{ __html: changeText(product.description) }} />
                  {product.hasOwnProperty('instructionsForUse') ?
                    <>
                      <h5>Hướng dẫn sử dụng:</h5>
                      <p dangerouslySetInnerHTML={{ __html: changeText(product.instructionsForUse) }} /></>
                    : null
                  }

                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
