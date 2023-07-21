import React from 'react'
import Image from 'next/image'
import styles from './org.module.css'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Link from 'next/link';


export default function OrgOngoingEvents({
  organizedUpcomingEvents,
  organizedOngoingEvents,
  archivedEvents
}) {

  return (

    <>

      <div className='p-2'>
        <div className={`btn-group  btn-group-sm ${styles.zIndexZero}`} id="pills-tab-org" role="tablist" aria-label="Basic mixed styles example">
          <button  className={`btn btn-danger active ${styles.zIndexZero}`} id="pills-ongoing-tab" data-bs-toggle="pill" data-bs-target="#pills-ongoing" type="button" role="tab" aria-controls="pills-ongoing" aria-selected="true">Live</button>
          <button  className={`btn btn-success ${styles.zIndexZero}`} id="pills-posted-tab" data-bs-toggle="pill" data-bs-target="#pills-posted" type="button" role="tab" aria-controls="pills-posted" aria-selected="false">Posted</button>
          <button  className={`btn btn-warning ${styles.zIndexZero}`} id="pills-archived-tab" data-bs-toggle="pill" data-bs-target="#pills-archived" type="button" role="tab" aria-controls="pills-archived" aria-selected="false">Archived</button>

        </div>
      </div>


      <div className="p-2 list-group">
        <div className="tab-content" id="pills-tabContent-org">
          <div className="tab-pane fade show active" id="pills-ongoing" role="tabpanel" aria-labelledby="pills-ongoing-tab">
            {(!organizedOngoingEvents || !organizedOngoingEvents.length) && <div>No Ongoing Events</div>}
            {organizedOngoingEvents &&
              organizedOngoingEvents.map((item, i) => (


                <Link href={`/tournament/create/${item.eventId}`} key={i} className={`list-group-item list-group-item-action ${styles.perList}`}  aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <Image src={item.logoURL} alt='event logo' width={40} height={40} priority />
                    <h5
                      className={`mb-1 ${styles.noWrapEllipsis}`}
                      data-tooltip-id="myTooltip"
                      data-tooltip-content={item.eventTitle}
                    >{item.eventTitle}</h5>
                    <small style={{ whiteSpace: 'nowrap' }}>{item.eventStatus}</small>
                  </div>
                  <div>
                  {/* <small>Event Settings  »</small> */}
                  </div>
                  {/* <p className="mb-1">Live</p> */}
                </Link>
              ))}

          </div>
          <div className="tab-pane fade" id="pills-posted" role="tabpanel" aria-labelledby="pills-posted-tab">
            {(!organizedUpcomingEvents || !organizedUpcomingEvents.length) && <div>No Posted Events</div>}
            {organizedUpcomingEvents &&
              organizedUpcomingEvents.map((item, i) => (


                <Link href="#" key={i} className={`list-group-item list-group-item-action ${styles.perList}`} aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <Image className="me-1" src={item.logoURL} alt='event logo' width={40} height={40} priority />

                    <h5
                      className={`mb-1 ${styles.noWrapEllipsis}`}
                      data-tooltip-id="myTooltip"
                      data-tooltip-content={item.eventTitle}
                    >
                      {item.eventTitle}
                    </h5>
                    <small style={{ whiteSpace: 'nowrap' }}>{item.countdown}</small>
                  </div>
                  <p className="mb-1">{item.address}</p>
                  <small>{item.startDate}</small>
                </Link>
              ))}

          </div>
          <div className="tab-pane fade" id="pills-archived" role="tabpanel" aria-labelledby="pills-archived-tab">
            {(!archivedEvents || !archivedEvents.length) && <div>No Archived Events</div>}
            {archivedEvents &&
              archivedEvents.map((item, i) => (


                <Link href="#" key={i} className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.eventTitle}</h5>
                    <small style={{ whiteSpace: 'nowrap' }}>3 days ago</small>
                  </div>
                  <p className="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </Link>
              ))}

          </div>
        </div>

      </div>
      <ReactTooltip id="myTooltip" effect="solid" />
    </>
  )
}