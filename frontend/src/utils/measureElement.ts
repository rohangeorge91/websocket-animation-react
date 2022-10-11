import React from 'react';
import ReactDOM from 'react-dom';
import { ObjectFlags } from 'typescript';

export const containerStyle = {
	display: "inline-block",
	position: "absolute",
	visibility: "hidden",
	zIndex: -1
};

// TODO: Figure out a dyanmic way to calculate child to help with style formating
/*
const measureLayer = (element) => {
	const container = document.createElement("div");
	Object.keys(containerStyle).forEach((key: string) => {
		container.style[key] = containerStyle[key];	
	});
	container.style = containerStyle;
	document.body.appendChild(container);

	// Renders the React element into the hidden div
	ReactDOM.render(element, container);

	// Gets the element size
	const height = container.clientHeight;
	const width = container.clientWidth;

	// Removes the element and its wrapper from the document
	ReactDOM.unmountComponentAtNode(container);
	container.parentNode.removeChild(container);
	return { height, width };
}
*/
const measureLayer = () => {};

export default measureLayer;