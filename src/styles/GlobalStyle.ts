import { createGlobalStyle } from "styled-components";
import css from "styled-jsx/css";

export const contentWidth = css`
  width: 1260px;
`;
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video,input {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    font-family: 'Montserrat';
	font-size: 16px;
	background-color: #1F1F1F;
	color: #fff;
}
button{
	border:none;
	background-color: transparent;
	font-family: inherit;
	cursor: pointer;
	font-size: inherit;

}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input,select{
	margin: 0;
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	:focus,:active{
		outline: none;
	}
	::placeholder{
		color:${({ theme }) => theme.colors.gray}
	}
}a,button{
	text-decoration: none;
	color:inherit
}

@media screen and (max-width:480px){
	body{
		font-size: 14px;
	}
}


`;

export default GlobalStyle;
