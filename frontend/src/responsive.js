import { css } from "styled-components"

export const mobile = (props) => {
  return css`
  @media only screen and (max-width: 375px){
    ${props}
  }`
};

export const mobileXR = (props) => {
  return css`
  @media only screen and (max-width: 414px){
    ${props}
  }`
};

export const tablet = (props) => {
  return css`
  @media only screen and (max-width: 820px){
    ${props}
  }`
};