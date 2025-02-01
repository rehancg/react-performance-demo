import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../shared/components/Card/Card';
import Button from '../../../../shared/components/Button/Button';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button onClick={() => console.log('Add to cart:', product)}>
        Add to Cart
      </Button>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(ProductCard); 