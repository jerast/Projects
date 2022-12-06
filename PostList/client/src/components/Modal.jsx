const Modal = ({children}) => {
	return (
		<dialog className="modal" open>
			{children}
		</dialog>
	);
};
export default Modal;
