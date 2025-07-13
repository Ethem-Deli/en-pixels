import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'your-project-id',
    dataset: 'production',
    apiVersion: '2022-03-07',
    useCdn: true
})