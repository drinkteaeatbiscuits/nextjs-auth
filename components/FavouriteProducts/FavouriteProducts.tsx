import { useEffect, useState } from 'react';
import useGetMe from '../../hooks/useGetMe';
import styles from './FavouriteProducts.module.scss'
import ProductCatalog from '../ProductCatalog/ProductCatalog';

const FavouriteProducts = (props:any) => {

    const [getCustomer, {data: customer}] = useGetMe();
    const [favourites, setFavourites] = useState<any>(null);

    // console.log(customer?.customer?.wishlists[0]?.items_v2.items);
    // console.log(favourites);

    useEffect(() => {
        !favourites && getCustomer();

        customer && setFavourites(customer?.customer?.wishlists[0]?.items_v2);
    
    }, [customer]);

    return <div className={styles.Favourites}>

{ favourites && favourites.items.length <= 0 && <p>You have no products in your favourites.</p>}

        { favourites && favourites.items && favourites.items.map((product:any) => {

            // return <div className="" key={product.uid}>Product</div>
		    return <ProductCatalog key={product.product.uid} product={product.product} layout={'list'} customer={customer} />
			})}
    </div>
}

export default FavouriteProducts;