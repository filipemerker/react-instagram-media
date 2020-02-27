import React, { PureComponent } from 'react'
import instagramMediaParser from '../helpers/instagramMediaParser'

class InstagramMedia extends PureComponent {
  constructor() {
    this.state = {
      post: {},
      error: false,
      loading: true,
    }
  }

  async componentDidMount() {
    try {
      const post = await instagramMediaParser({ uri: this.props.uri })
      
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
    const { post, error, loading } = this.state
    const {
      renderItem = () => null,
      renderMediaList = () => null,
      renderError = () => null,
      renderLoading = () => null,
      uri
    } = this.props

    if (loading) {
      return renderLoading()
    }

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