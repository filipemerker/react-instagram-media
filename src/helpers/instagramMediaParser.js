const getAbstractData = data => {
  try {
    const id = data.id
    const types =  {
      GraphVideo: 'video',
      GraphImage: 'image',
      GraphSidecar: 'multiple',
    }
    const type = types[data.__typename]
    let media = []
    let description = ''
    let like_count = 0
    let comment_count = 0


    if (type === 'video') {
      media = [{
        video_url: data.video_url,
        video_view_count: data.video_view_count,
        display_url: data.display_url,
        dimensions: data.dimensions,
        type
      }]
    } else if (type === 'image') {
      media = [{
        display_url: data.display_url,
        dimensions: data.dimensions,
        type
      }]
    } else {
      media = data
        .edge_sidecar_to_children
        .edges
        .map(({ node }) => {
          const [ item ] = getAbstractData(node).media

          return item
        })
    }

    if (data.edge_media_to_caption) {
      description = (
        data
          .edge_media_to_caption
          .edges[0]
          .node
          .text
      )
    }

    if (data.edge_media_preview_like) {
      like_count = data.edge_media_preview_like.count
    }

    if (data.edge_media_preview_comment) {
      comment_count = data.edge_media_preview_comment.count
    }

    return {
      id,
      description,
      like_count,
      comment_count,
      type,
      media
    }
  } catch (err) {
    throw ({ message: `Malformed response from Instagram` })
  }
}

const instagramMediaParser = async ({ uri, verbose }) => {
  try {
    const response = await (
      fetch(uri)
        .then(payload => payload.text())
        .then(payload => {
          const [markup, _sharedData] = payload.split("window._sharedData = ")
          const [data] = _sharedData.split(";</script>")

          return JSON.parse(data)
        })
        .then((data = {}) => data.entry_data.PostPage[0])
        .then((data = {}) => data.graphql)
        .then((data = {}) => data.shortcode_media)
    )

    return verbose ? response : getAbstractData(response)
  } catch (err) {
    throw ({ message: `Couldn't fetch this post`, uri })
  }
}

export default instagramMediaParser