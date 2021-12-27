import { css } from '@emotion/react'
import NextImage from 'next/image'

import imageSrc from '~/images/profile-square.png'

const imageContainerCss = css`
  position: relative;
  width: 100%;
  min-height: 28rem;

  @media screen and (min-width: 640px) {
    width: 50%;
  }
`

const imageCss = css`
  object-fit: cover;
  object-position: left center;
  border-radius: 0.5rem;

  @media screen and (min-width: 640px) {
    object-position: left 30%;
  }
`

export function ProfileImage() {
  return (
    <section css={imageContainerCss}>
      <NextImage
        alt="Hey, that's me!"
        title="Hey, that's me!"
        priority
        src={imageSrc}
        placeholder="blur"
        layout="fill"
        css={imageCss}
      />
    </section>
  )
}
