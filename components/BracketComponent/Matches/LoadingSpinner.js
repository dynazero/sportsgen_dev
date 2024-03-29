import styles from './spinner.module.css'

export default function Loading() {
    return (
        <>
            <svg className={`${styles.spinner}`} viewBox="0 0 50 50">
                <circle className={`${styles.path}`} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </>
    )
}