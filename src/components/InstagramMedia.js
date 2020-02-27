import React, { PureComponent } from 'react'
import intagramMediaParser from '../helpers/instagramMediaParser'

class InstagramMedia extends PureComponent {
  state = {
    post: {},
    error: false
  }

  async componentDidMount() {
    try {
      const post = await intagramMediaParser({ uri: this.props.uri })
      
      this.setState({ post })
    } catch (err) {
      console.error(err)

      this.setState({ error: true })
    }
  }

  getPostData() {
    return this.state
  }

  render() {
    const { post, error } = this.state
    const { renderItem, renderMediaList, renderError, uri } = this.props

    if (error) {
      return renderError(uri)
    }

    if (post.type === 'multiple') {
      return renderMediaList(
        post
          .media
          .map(media => renderItem(media))
      )
    }

    return renderItem(post.media[0])
  }
}

export default InstagramMedia