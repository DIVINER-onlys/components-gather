export default function (title, image, siteName, description) {
  console.log(`title,image,site_name,description`, title, image, siteName, description)
  return {
    title: title,
    meta: [
      {
        property: 'og:site_name',
        content: siteName
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:image',
        content: image
      },
      {
        propterty: 'og:description',
        content: description
      },
      {
        propterty: 'twitter:title',
        content: title
      },
      {
        propterty: 'twitter:image',
        content: image
      },
      {
        propterty: 'twitter:card',
        content: 'summary'
      },
      {
        propterty: 'twitter:description',
        content: description
      }
    ]
  }
}
