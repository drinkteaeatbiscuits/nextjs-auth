import useGetBasket from "../hooks/useGetBasket";

const Cart = (props:any) => {

	const { data, error, refetch, loading } = useGetBasket();

	const {showBasket, setShowBasket} = props;

	// console.log(data);
	// console.log(showBasket);

	return <div style={{
		transform: showBasket ? 'translateX(0px)' : 'translateX(100%)',
		position: 'fixed',
		top: 0,
		right: 0,
		height: '100%',
		background: '#fff',
		zIndex: 99,
		width: '90%',
		maxWidth: '320px',
		}}>
			<div style={{cursor: 'pointer'}} onClick={() => { setShowBasket(false) }}>Close</div>
		<h1>Basket</h1>
		{!loading && data?.customerCart?.items.length > 0 && data?.customerCart?.items?.map((item: any) => {
				return <div key={item.id}>{item.product.name} x {item.quantity}</div>
			})}
	</div>;
}

export default Cart;