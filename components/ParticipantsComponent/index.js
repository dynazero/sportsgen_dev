import { useEffect, useState } from 'react'
import styles from './participantscomponent.module.css'
import Image from 'next/image'


const ParticipantsComponent = ({ participantsData, categorykey, categorySet }) => {

  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey))


  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])


  return (
    <>
      <div className="d-flex justify-content-center">
        {categorySet.map(category => {
          const filteredParticipants = participantsData.filter(participant => category.key === parseInt(participant.eventKey));

          if (category.key === selectedCategory) {
            return (
              <div key={category.key} className={`${styles.rowWidth}`}>
                <table className="table table-striped table-sm">
                  {filteredParticipants.length > 0 && (
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Athlete</th>
                        <th>Event</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {filteredParticipants.length === 0 ?
                      (
                        <tr>
                          <td>
                            There are no Participants in this event
                          </td>
                        </tr>
                      ) : (
                        filteredParticipants.map((participant, index) => (
                          <tr key={index} >
                            <td>{index + 1}.</td>
                            <td>
                              <Image src={participant.imageURL} alt='athlete picture' width={25} height={25} priority />
                            </td>
                            <td className={`${styles.athlete}`}>{participant.athlete}</td>
                            <td className={`text-nowrap ${styles.event}`}>{participant.event}</td>
                          </tr>

                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            )
          } else {
            return null;
          }
        })}
      </div>




    </>


  )
}

export default ParticipantsComponent;
