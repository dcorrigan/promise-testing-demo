import React from 'react'
import { expect } from 'chai';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import nock from 'nock';
import RecipeSearch from '../src/RecipeSearch';

describe('RecipeSearch', () => {
  const defaultResponse = [{
    url: 'http://awesomerecipes.com/swedish-meatballs',
    name: 'Totally Awesome Swedish Meatballs'
  }];

  // use nock to mock the API response
  beforeEach(() => {
    nock('http://api.awesomerecipes.com')
      .get('/search')
      .reply(200, defaultResponse);
  });

  // synchronous version, does not pass
  it.skip('should return a list of recipes when the user searches but will not here', () => {
    let fetchedData;
    const updateMePlease = (data) => {
      fetchedData = data;
    }

    const component = mount(
      <RecipeSearch
        updateParent={updateMePlease}
      />
    );

    component.find('input[name="search"]')
      .simulate('change', {target: {value: 'swedish meatballs'}});
    component.find('input[type="submit"]').simulate('click');

    expect(fetchedData).to.deep.eq(defaultResponse);
  });

  it('should return a list of recipes when the user searches', () => {
    let component;
    let fetchedData;

    return new Promise((resolve, reject) => {
      const updateMePlease = (data) => {
        fetchedData = data;
        // this is the important bit: let the callback function in the
        // component resolve this promise
        resolve(true);
      }

      component = mount(
        <RecipeSearch
          updateParent={updateMePlease}
        />
      );

      component.find('input[name="search"]')
        .simulate('change', {target: {value: 'swedish meatballs'}});
      component.find('input[type="submit"]').simulate('click');
    }).then(bool => {
      expect(fetchedData).to.deep.eq(defaultResponse);
    });
  });
});
