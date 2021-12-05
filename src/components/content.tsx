import styles from './content.module.css'

interface Props {
  html: string
}

export default function Content({ html }: Props) {
  return (
    <article
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
