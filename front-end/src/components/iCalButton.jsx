import { getiCalEventDetails } from "../utilities/EventUtilities";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ICalButton() {
	const [iCal, setICal] = useState([])
	let { eventID } = useParams();


	const fetchiCal = async () => {
		const details = await getiCalEventDetails(eventID);
		setICal(details);
	}

	useEffect(() => {
		fetchiCal();
	}, [eventID]);

	return (
		<div className="d-flex justify-content-center">
		{iCal.title && 
		<add-to-calendar-button
			// style={{ height: "50px" }}
			// size="5"
			// label="Add to Calendar"
			buttonsList
			hideTextLabelButton
			buttonStyle="round"
			lightMode="bodyScheme"
			options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
			name={iCal.title}
			location={
				iCal.event_type === "Virtual"
					? iCal.virtual_event_link
					: `${iCal.event_venue} - ${iCal.event_venue_address}`
			}
			startDate={iCal.startDate}
			endDate={iCal.endDate}
			startTime={iCal.startTime}
			endTime={iCal.endTime}
			timeZone={iCal.time_zone}
			description={iCal.description}>
		</add-to-calendar-button>
		}
		</div>
	)
}

					{/* add to calendar button
					{iCalDetails.description && (
						<add-to-calendar-button
							style={{ height: "50px" }}
							size="5"
							label="Add to Calendar"
							options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
							name={iCalDetails.title}
							location={
								eventDetails.event_type === "Virtual"
									? eventDetails.virtual_event_link
									: `${eventDetails.event_venue} - ${eventDetails.event_venue_address}`
							}
							startDate={iCalDetails.startDate}
							endDate={iCalDetails.endDate}
							startTime={iCalDetails.startTime}
							endTime={iCalDetails.endTime}
							timeZone={iCalDetails.time_zone}
							description={iCalDetails.description}></add-to-calendar-button>
					)} */}
