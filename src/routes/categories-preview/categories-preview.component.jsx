
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
// import ProductCard from "../../components/product-card/product-card.component"
//import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    //console.log('categories map')

    const  categoriesMap = useSelector(selectCategoriesMap)
   // console.log(categoriesMap);
   // console.log(Object.keys(categoriesMap))
    return(
        <>
        {
            
            Object.keys(categoriesMap).map(title =>{
                const products = categoriesMap[title];
                console.log(products)
                return(
                    <CategoryPreview key={title} title={title} products={products} />
                )
            })
        }
        </>
    )
}

export default CategoriesPreview