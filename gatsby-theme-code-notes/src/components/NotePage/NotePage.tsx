import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { FunctionComponent } from 'react'
import { Box, Flex, Heading, Link } from 'theme-ui'
import { useSiteMetadata } from '../../use-site-metadata'
import { Contents } from '../Contents'
import { DateModified } from '../DateModified'
import { Layout } from '../Layout'
import { TagList } from '../TagList'

interface NotePageProps {
  data: {
    mdx: {
      frontmatter: {
        tags: string[]
        title: string
        emoji: string
        link: string
      }
      body: any
      fields: {
        dateModified: string
      }
      parent: {
        relativePath: string
      }
      tableOfContents: any
    }
  }
  pageContext: {
    id: string
    previous: boolean
    next: boolean
    hasUntagged: boolean
    basePath?: string
  }
  location: {
    pathname: string
  }
}

export const NotePage: FunctionComponent<NotePageProps> = ({
  data,
  pageContext,
  location,
}) => {
  if (!data) {
    return null
  }
  const {
    frontmatter: { title, tags, emoji, link },
    fields: { dateModified },
    body,
    parent: { relativePath },
    tableOfContents,
  } = data.mdx

  const { gitRepoContentPath } = useSiteMetadata()
  const showMetadata = !!(link || dateModified)

  return (
    <Layout
      hasUntagged={pageContext.hasUntagged}
      basePath={pageContext.basePath}
      path={location.pathname}
      title={title}
    >
      <article>
        <Box as="header" mb={4}>
          {emoji && (
            <Box
              sx={{
                fontSize: 7,
                lineHeight: 1,
                mb: 3,
              }}
            >
              <span role="img">{emoji}</span>
            </Box>
          )}

          <Heading as="h1" variant="noteTitle">
            {title}
          </Heading>

          {showMetadata && (
            <Flex sx={{ mb: 3 }}>
              {link && (
                <Link
                  href={link}
                  sx={{ mr: 3, fontFamily: 'monospace', fontSize: 0 }}
                >
                  {link}
                </Link>
              )}
              {false && <DateModified>{dateModified}</DateModified>}
            </Flex>
          )}

          {tags && (
            <Flex>
              <TagList tags={tags} />
            </Flex>
          )}
        </Box>

        <Contents toc={tableOfContents} />

        <MDXRenderer>{body}</MDXRenderer>

        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '2px solid',
            borderTopColor: 'background',
          }}
        >
          {gitRepoContentPath && (
            <Link href={`${gitRepoContentPath}${relativePath}`}>
              Edit this page
            </Link>
          )}
        </Box>
      </article>
    </Layout>
  )
}
