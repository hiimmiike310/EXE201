import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const price = (product.price * 2).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const formattedPrice = product.price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text style={{ color: 'red' }} as='h3'>{formattedPrice} VND</Card.Text>
        <Card.Text style={{ textDecoration: 'line-through', lineHeight: '26px' }} as='h4'>{price} VND</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
