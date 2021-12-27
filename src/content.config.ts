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

/**
 * Google Analytics ID.
 *
 * Set to any falsy value to disable injection of GA scripts.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA
