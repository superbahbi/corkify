import React, { useEffect, useState, useRef } from 'react'

import { Image,Text } from 'react-native'

import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'

const CachedImage = props => {
  const { source: { uri }, cacheKey } = props
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

  const [imgURI, setImgURI] = useState("https://firebasestorage.googleapis.com/v0/b/corkify-41a8d.appspot.com/o/LB7672-1884.jpg?alt=media&token=f1f29ff3-36dc-46ea-a712-77c01c7b5f1a")

  const componentIsMounted = useRef(true)
  useEffect(() => {
    const loadImage = async ({ imgURI }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(imgURI)
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null)
            await FileSystem.downloadAsync(
              uri,
              imgURI
            )
          }
          if (componentIsMounted.current) {
            setImgURI(imgURI)
          }
        }
      } catch (err) {
        console.log() // eslint-disable-line no-console
        setImgURI(uri)
      }
    }

    loadImage({ imgURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (

    <Image
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      source={{
        uri: imgURI,
      }}
    />
  )
}

CachedImage.propTypes = {
  source: PropTypes.object.isRequired,
  cacheKey: PropTypes.string.isRequired,
}

export default CachedImage