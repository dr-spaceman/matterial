import * as React from 'react'

import { DateTimeType } from '../../interfaces/other'
import { DateTime } from '../DateTime'
import { Icon } from '../Icon'
import { Link } from '../Link'
import classes from './article.module.scss'

export type ArticleProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * Article content
   */
  children: React.ReactNode
  /**
   * Article date
   */
  date?: DateTimeType
  /**
   * A brief description
   */
  description?: string | React.ReactElement
  /**
   * Indicate what to read next in a series; Should be a <Link> component or <a> hyperlink
   */
  nextArticle?: React.ReactElement
  /**
   * A short introduction to the article
   */
  preface?: string | React.ReactElement
  /**
   * Article title
   */
  title?: string
}

/**
 * Render an article. A header will be built based on props passed, or include a custom header in
 * the content.
 */
export function Article({
  title,
  description,
  preface,
  date,
  nextArticle,
  children,
  ...rest
}: ArticleProps): JSX.Element {
  let header: null | React.ReactElement = null
  let hasHeader = false
  let next: null | React.ReactElement = null

  if (nextArticle) {
    // Dissect given <Link> or <a> component and rebuild it using original props
    next = (
      <section className={classes.next}>
        <Link href={nextArticle.props.href} {...nextArticle.props}>
          <small className="text-label">Up Next</small>
          <big>
            <strong>{nextArticle.props.children}</strong>
            <Icon icon="ArrowRight" className="arrow" />
          </big>
        </Link>
      </section>
    )
  }

  if (children) {
    // Check for <header> in children
    React.Children.forEach(children, (child: any) => {
      if (child && child.type === 'header') {
        hasHeader = true
      }
    })
  }

  // Build header manually if not given
  if (!hasHeader) {
    header = (
      <header>
        {date && <DateTime date={date} />}
        <h1>{title}</h1>
        {description && (
          <div className={classes.description}>{description}</div>
        )}
        {preface && <div className={classes.preface}>{preface}</div>}
      </header>
    )
  }

  return (
    <article className={classes.root} {...rest}>
      {header}
      {children}
      {next}
    </article>
  )
}

type ArticleContentProps = {
  htmlContent?: string // Static HTML to set as article content; Uses React's `dangerouslySetInnerHTML` inside an additional <div> element
  children?: React.ReactElement // Article body
}

/**
 * Helper component to render the content of an article. Useful for rendering static HTML, eg.
 * from parsed Markdown.
 *
 * @note This component is merely a solution to render static HTML in React. Once we can
 * dangerouslySetInnerHTML to a fragment, this component can be removed or updated.
 * @see https://github.com/facebook/react/issues/12014
 * @see https://github.com/reactjs/rfcs/pull/129
 */
export function ArticleContent({ htmlContent, children }: ArticleContentProps) {
  if (htmlContent) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }

  return children
}
