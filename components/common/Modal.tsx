import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'

interface Props {
	show: any
	onClose: any
	children: JSX.Element
	title: string
}

const Modal: React.FC<Props> = ({ show, onClose, children, title }) => {
	const [isBrowser, setBrowser] = useState<boolean>(false)
	const ref = useRef<HTMLDivElement | any>(null)
	const handleClose = (e: any) => {
		e.preventDefault()
		ref.current.focus()
		onClose()
	}

	useEffect(() => {
		setBrowser(true)
		ref.current = document.querySelector('.modal-root')!

		return () => setBrowser(false)
	}, [])

	const modalContent = show ? (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<button onClick={handleClose} className={styles.btn}>
						<FaTimes />
					</button>
				</div>
				{title && <div>{title}</div>}
				{children && <div className={styles.body}>{children}</div>}
			</div>
		</div>
	) : null

	if (isBrowser) {
		return createPortal(modalContent, ref.current!)
	} else {
		return null
	}
}

export default Modal
