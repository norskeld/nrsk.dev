import { css, keyframes } from '@emotion/react'

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, -1px, 0);
  }

  20%, 80% {
    transform: translate3d(1px, 1px, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 2px, 0);
  }

  40%, 60% {
    transform: translate3d(2px, -2px, 0);
  }
`

const logoCss = css`
  display: block;
  height: 3rem;

  @media screen and (min-width: 560px) {
    height: 4rem;
  }

  &:hover path {
    fill: var(--accent);
    transition: fill 100ms ease-in-out;
  }

  &:hover {
    cursor: pointer;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    animation: ${shake} 900ms cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite alternate-reverse;
  }
`

export default function Logo() {
  return (
    <svg css={logoCss} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384">
      <path
        d="M96 208v160a16 16 0 0 1-16 16H0V208a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16Zm288 0v176h-80a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16ZM86.4 0a16 16 0 0 1 14.1 8.5L240.1 273a16 16 0 0 1 .1 14.7L210 348a16 16 0 0 1-28.5.3L0 0h86.4ZM384 0l-91.6 183.2a16 16 0 0 1-14.3 8.8H218a16 16 0 0 1-14.3-23.2l80-160A16 16 0 0 1 297.9 0H384Z"
        fill="#1d1d1d"
        fillRule="evenodd"
      />
    </svg>
  )
}
