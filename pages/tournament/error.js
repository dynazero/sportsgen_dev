import React from 'react'
import Image from 'next/image'
import logo from '../../public/bullsolo.png'
// '../public/bullsolo.png'


export default function error() {
    return (
        <>
            <div className="center">
            <span>
              <Image src={logo} alt="sportsgenbull" width={90} height={120} />
            </span>
                <h1>404</h1>
                <div>Unauthorized</div>
            </div>

        </>
    )
}
