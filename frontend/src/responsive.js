import { css } from "styled-components"

export const mobile = (props) => {
  return css`
  @media only screen and (max-width: 375px){
    ${props}
  }`
};

export const mobileXR = (props) => {
  return css`
  @media only screen and (min-width: 375px) and (max-width: 500px){
    ${props}
  }`
};

export const tablet = (props) => {
  return css`
  @media only screen and (min-width: 500px) and (max-width: 820px){
    ${props}
  }`
};

export const ipad = (props) => {
  return css`
  @media only screen and (min-width: 820px) and (max-width: 1150px){
  @media only screen and (min-width: 820px) and (max-width: 1185px){
    ${props}
  }`
};