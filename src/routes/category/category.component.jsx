import {useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
 // console.log('rendering category');

  const [products, setProducts] = useState(categoriesMap[category]);
 // console.log('render/re-rendering category component')

  useEffect(() => {
    console.log('effect calling setProdcts')
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      {
        isLoading ? ( <Spinner /> ) :
      ( 
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      )}
    </Fragment>
  );
};

export default Category;