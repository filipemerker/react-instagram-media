import instagramMediaParser from "./instagramMediaParser"
import 'whatwg-fetch'

describe('Instagram Media Parser', () => {
  test('parse image correctly', () => {
    return (
      instagramMediaParser({ uri: 'https://www.instagram.com/p/B866lKJgReK/' })
        .then(post => {
          expect(post).toMatchObject({
            id: expect.any(String),
            description: expect.any(String),
            like_count: expect.any(Number),
            comment_count: expect.any(Number),
            type: expect.stringMatching('image')
          })

          expect(post.media[0]).toMatchObject({
            display_url: expect.any(String),
            type: expect.stringMatching('image'),
          })

          expect(post.media[0].dimensions).toMatchObject({
            height: expect.any(Number),
            width: expect.any(Number),
          })
        })
    )
  })

  test('parse video correctly', () => {
    return (
      instagramMediaParser({ uri: 'https://www.instagram.com/p/B8waiGXgLlD/' })
        .then(post => {
          expect(post).toMatchObject({
            id: expect.any(String),
            description: expect.any(String),
            like_count: expect.any(Number),
            comment_count: expect.any(Number),
            type: expect.stringMatching('video')
          })

          expect(post.media[0]).toMatchObject({
            display_url: expect.any(String),
            type: expect.stringMatching('video'),
          })

          expect(post.media[0].dimensions).toMatchObject({
            height: expect.any(Number),
            width: expect.any(Number),
          })
        })
    )
  })

  test('parse multiple correctly', () => {
    return (
      instagramMediaParser({ uri: 'https://www.instagram.com/p/B7ETtFhAUwr/' })
        .then(post => {
          expect(post).toMatchObject({
            id: expect.any(String),
            description: expect.any(String),
            like_count: expect.any(Number),
            comment_count: expect.any(Number),
            type: expect.stringMatching('multiple')
          })

          expect(post.media.length).toBeGreaterThan(1)

          post.media.map(media => (
            expect(media).toMatchObject({
              display_url: expect.any(String),
              type: expect.stringMatching(/image|video|multiple/),
            })
          ))

          expect(post.media[0].dimensions).toMatchObject({
            height: expect.any(Number),
            width: expect.any(Number),
          })
        })
    )
  })

  test('fail to parse a valid uri but with different schema', () => {
    return (
      instagramMediaParser({ uri: 'https://www.instagram.com/instagram/' })
        .catch(err => (
          expect(err).toMatchObject({
            message: expect.stringMatching(`Couldn't fetch this post`),
            uri: expect.any(String),
          })
        ))
    )
  })

  test('fail to parse an uri', () => {
    return (
      instagramMediaParser({ uri: 'https://www.instagram.com/p/123/' })
        .catch(err => (
          expect(err).toMatchObject({
            message: expect.stringMatching(`Couldn't fetch this post`),
            uri: expect.any(String),
          })
        ))
    )
  })
})