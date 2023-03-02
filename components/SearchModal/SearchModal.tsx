import style from './SearchModal.module.scss';

const SearchModal = (props:any) => {

	const {showSearchModal, setShowSearchModal} = props;

	return <div className={style.searchModal} style={{
		transform: showSearchModal ? 'translateY(0px)' : 'translateY(-100%)'}}>
		
		<div className={style.closeWrap}>
			<div className={style.close} style={{cursor: 'pointer'}} onClick={() => { setShowSearchModal(false) }}>Close</div>
		</div>

		<p>Search</p>
		
	</div>
}

export default SearchModal;