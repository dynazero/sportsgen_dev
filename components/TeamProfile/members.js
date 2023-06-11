import React, { useState, useEffect } from 'react'

const Members = ({ members }) => {

    const [membersList, setMembersList] = useState(false)

    useEffect(() => {
        members.length === 0 ? setMembersList(false) : setMembersList(true);
    }, [members])

    return (

        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Last</th>
                    <th scope="col">First</th>
                    {/* <th scope="col">Profile</th> */}
                </tr>
            </thead>
            <tbody>
                {membersList && members.map((item, i) => (
                    <tr key={item.combinedSequence}>
                        <th scope="row" className='paddingList'>{item.combinedSequence}</th>
                        <td className='paddingList'>{item.lname}</td>
                        <td className='paddingList'>{item.fname}</td>

                    </tr>
                ))}

            </tbody>
        </table>

    )
}

export default Members