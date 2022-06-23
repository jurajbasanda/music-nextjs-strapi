import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'

interface Props {
	show: any
	onClose: any
	children: JSX.Element
	title: string
}

const Modal: React.FC<Props> = ({ show, onClose, children, title }) => {
	const portalDiv: any = document.getElementsByClassName('modal-root')!
	const [isBrowser, setBrowser] = useState<boolean>(false)

	const handleClose = () => {
		console.log('close')
	}

	useEffect(() => {
		setBrowser(true)
	}, [])

	const modalContent = show ? (
		<div className={styles.overley}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<button onClick={handleClose}>
						<FaTimes />
					</button>
				</div>
				{title && <div>{title}</div>}
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	) : null

	if (isBrowser) {
		return portalDiv && ReactDOM.createPortal(modalContent, portalDiv)
	} else {
		return null
	}
}

export default Modal
