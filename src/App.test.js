import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('React Terminal', () => {
	it('should render', () => {
		let div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});

});
