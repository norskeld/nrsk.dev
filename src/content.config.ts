/**
 * Directory that contains blog content.
 *
 * **Note**: if changing to something else, don't forget to add it to the `.vercelignore` so it's
 * not ignored, because it ignores everything _except_ specifically allowed files/directories.
 */
export const BLOG_DIR = 'blog'

/**
 * Theme to use for syntax highlighting in Shiki.
 *
 * Custom themes (any Visual Studio Code theme will do) reside in `<root>/src/syntax` directory.
 */
export const BLOG_SYNTAX_THEME = 'norskeld'

/** Ackee Domain ID. */
export const ACKEE_DOMAIN_ID = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID

/** Ackee Host. This is the host with Ackee server. */
export const ACKEE_HOST = process.env.NEXT_PUBLIC_ACKEE_HOST

/** Ackee Tracker. Defaults to `tracker.js`. */
export const ACKEE_TRACKER = process.env.NEXT_PUBLIC_ACKEE_TRACKER ?? 'tracker.js'
