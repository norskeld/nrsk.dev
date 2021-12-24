import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { Common } from '@/seo.config'

import { AboutSection, AboutDescription, ProfilePicture } from '@/components/screens/about'

import Heading from '@/components/shared/heading'
import Layout from '@/components/shared/layout'
import AppLink from '@/components/shared/link'

/** The about page. */
export default function () {
  const { asPath } = useRouter()

  const seo = {
    url: Common.host + asPath,
    title: `About`,
    description:
      `Vladislav Mamon is a front-end developer with a passion for functional ` +
      `programming, compiler/PL design, Rust, and TypeScript.`
  }

  const GitHubLink = () => (
    <AppLink external blank href="https://github.com/norskeld">
      several OSS projects
    </AppLink>
  )

  const BandcampLink = () => (
    <AppLink external blank href="https://hypnosense.bandcamp.com">
      Bandcamp
    </AppLink>
  )

  const SpotifyLink = () => (
    <AppLink external blank href="https://open.spotify.com/artist/1EqX9erOVQHCVlAwGihPS2">
      Spotify
    </AppLink>
  )

  return (
    <Layout>
      <NextSeo
        title={seo.title}
        canonical={seo.url}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <Heading level={1} size="xxl">
        {seo.title}
      </Heading>

      <AboutSection>
        <ProfilePicture />

        <AboutDescription>
          <p>
            Hi there! I'm a front-end developer with a passion for{' '}
            <strong>functional programming</strong>, <strong>compiler/PL design</strong>,{' '}
            <strong>Rust</strong>, and <strong>TypeScript</strong>. I also have <GitHubLink /> I
            work on in my free time.
          </p>

          <p>
            Besides that, I sporadically write music, mostly ambient-drone with a pinch of field
            recordings, which is available for free on my <BandcampLink /> page and <SpotifyLink />.
          </p>
        </AboutDescription>
      </AboutSection>
    </Layout>
  )
}
