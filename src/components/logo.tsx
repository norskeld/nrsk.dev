import styles from './logo.module.css'

export default function Logo() {
  return (
    <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384">
      <path
        d="M96 208v160a16 16 0 0 1-16 16H0V208a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16Zm288 0v176h-80a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16ZM86.4 0a16 16 0 0 1 14.1 8.5L240.1 273a16 16 0 0 1 .1 14.7L210 348a16 16 0 0 1-28.5.3L0 0h86.4ZM384 0l-91.6 183.2a16 16 0 0 1-14.3 8.8H218a16 16 0 0 1-14.3-23.2l80-160A16 16 0 0 1 297.9 0H384Z"
        fill="#1d1d1d"
        fillRule="evenodd"
      />
    </svg>
  )
}
