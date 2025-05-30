import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const PhotoCard = ({url,onClick}) => {
    return (
      <div>
         <div>
            <Image src={url} alt='image' width={100} height={100} priority/>
          </div>
            <button type='button' onClick={onClick} >Delete</button>
      </div>
    )
}


export default PhotoCard