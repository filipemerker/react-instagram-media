import React from 'react'
import InstagramMedia from './InstagramMedia'
import renderer from 'react-test-renderer'
import 'whatwg-fetch'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <InstagramMedia
        uri="https://www.instagram.com/p/B866lKJgReK/"
        renderItem={
          ({ dimensions, display_url }) => (
            <img
              src={display_url}
              style={{ height: dimensions.height, width: dimensions.width }}
            />
          )
        }
        renderError={() => (
          <div>I have failed to parse</div>
        )}
        renderLoading={() => (
          <div>Loading</div>
        )}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot()
})