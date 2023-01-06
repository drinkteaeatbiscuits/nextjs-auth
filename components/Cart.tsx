import useGetBasket from "../hooks/useGetBasket";

const Cart = (showBasket:any) => {
	
	const {data, error, refetch, loading} = useGetBasket();

	console.log(data);

	return <div style={{transform: showBasket ? 'translateX(0px)' : 'translateX(100%)'}}>
		<h1>Basket</h1>
		{!loading && data?.customerCart?.items.length > 0 && data?.customerCart?.items?.map((item: any) => {
				return <div key={item.id}>{item.product.name} x {item.quantity}</div>
			})}
	</div>;
}

export default Cart;