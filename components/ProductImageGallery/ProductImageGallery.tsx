import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './ProductImageGallery.module.scss';
import { useState } from 'react';

const ProductImageGallery = (props:any) => {

    const { product } = props;
    const [selectedImage, setSelectedImage] = useState(product.image);

    return <div className={styles.productImages}>

        <div className={styles.mainImage}>
            <LazyLoadImage
                    className={styles.image}
                    alt={selectedImage?.label}
                    src={selectedImage?.url}
                />
        </div>

        <div className={styles.productImageGallery}>

            {product.media_gallery.length > 0 && product.media_gallery.map((image:any) => {

                return <div className={styles.productImage} key={'media-image-' + image.position} onClick={() => setSelectedImage(image)}><LazyLoadImage
                className={styles.galleryImage}
                alt={image?.label}
                src={image?.url}
                    /></div>

            })}
        </div>

    </div>
    
    
}

export default ProductImageGallery;