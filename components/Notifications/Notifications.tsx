import { useReactiveVar } from "@apollo/client";
import notification from "../../constants/notification";
import { useEffect, useState } from "react";

import styles from './Notifications.module.scss';

const Notifications = (props:any) => {

	const notifications = useReactiveVar(notification);
	const [displayNotification, setDisplayNotification] = useState<any>(null);

	useEffect(() => {

		notifications && showNotification(notifications);

	}, [notifications]);

	const showNotification = (notifications:any) => {

		setDisplayNotification(notifications);
		
		setTimeout(() => {

			setDisplayNotification(null);

			notification(undefined);
			
		}, 3000);

	}
	
	return <div className={styles.notificationsWrap}>
		{ displayNotification?.message && <div className={styles.notification}>

				{displayNotification?.notificationType === 'error' && <div className={styles.notificationIcon}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="37.5" viewBox="0 0 40 37.5">
						<path id="error_triangle_alt" data-name="error triangle alt" d="M39.531,33.828,22.166,1.328a2.47,2.47,0,0,0-4.38,0L.342,33.828a2.273,2.273,0,0,0,.039,2.461A2.378,2.378,0,0,0,2.533,37.5H37.341a2.378,2.378,0,0,0,2.151-1.211A2.273,2.273,0,0,0,39.531,33.828ZM2.533,35,19.976,2.5,37.341,35Zm14.94-19.922v7.5a2.49,2.49,0,0,0,4.263,1.758,2.4,2.4,0,0,0,.743-1.758v-7.5a2.365,2.365,0,0,0-.743-1.8,2.554,2.554,0,0,0-3.52,0A2.365,2.365,0,0,0,17.473,15.078Zm.7,13.2a2.336,2.336,0,0,0-.7,1.719,2.49,2.49,0,0,0,4.263,1.758,2.5,2.5,0,0,0-1.76-4.258A2.474,2.474,0,0,0,18.177,28.281ZM40,35" fill="#b53030"/>
					</svg>
				</div>}
				{displayNotification?.notificationType === 'success' && <div className={styles.notificationIcon}><svg xmlns="http://www.w3.org/2000/svg" width="38.32" height="36.68" viewBox="0 0 38.32 36.68">
					<path id="check_circle" data-name="check circle" d="M35,15.156a1.624,1.624,0,0,0-1.23.469,1.678,1.678,0,0,0-.449,1.211V18.32a14.716,14.716,0,0,1-1.172,5.859,14.921,14.921,0,0,1-7.969,7.969A14.716,14.716,0,0,1,18.32,33.32h0a14.716,14.716,0,0,1-5.859-1.172A14.921,14.921,0,0,1,4.492,24.18,14.716,14.716,0,0,1,3.32,18.32a14.716,14.716,0,0,1,1.172-5.859,14.921,14.921,0,0,1,7.969-7.969A14.716,14.716,0,0,1,18.32,3.32h0a13.773,13.773,0,0,1,3.145.352,19.926,19.926,0,0,1,3.027.977,1.651,1.651,0,0,0,1.27.039,1.405,1.405,0,0,0,.879-.859,1.651,1.651,0,0,0,.039-1.27,1.405,1.405,0,0,0-.859-.879A20.936,20.936,0,0,0,22.188.449,16.54,16.54,0,0,0,18.32,0h0a17.714,17.714,0,0,0-7.148,1.445,17.831,17.831,0,0,0-5.84,3.906,18.877,18.877,0,0,0-3.926,5.82A18.324,18.324,0,0,0,0,18.32a18.138,18.138,0,0,0,1.406,7.148,18.292,18.292,0,0,0,9.766,9.766A17.714,17.714,0,0,0,18.32,36.68h0a17.714,17.714,0,0,0,7.148-1.445,18.292,18.292,0,0,0,9.766-9.766,18.138,18.138,0,0,0,1.406-7.148V16.836a1.678,1.678,0,0,0-.449-1.211A1.574,1.574,0,0,0,35,15.156Zm-20.508.352a1.658,1.658,0,1,0-2.344,2.344l5,5a2.319,2.319,0,0,0,.527.352,1.831,1.831,0,0,0,1.289,0,2.319,2.319,0,0,0,.527-.352l16.68-16.68a1.7,1.7,0,0,0,0-2.344,1.606,1.606,0,0,0-2.344,0L18.32,19.336ZM38.32,35" fill="#9daf21"/>
					</svg>
				</div>}

				<p>{ displayNotification?.message }</p>
			
			</div> }

		{/* <div className={styles.notification}><p>Unable to place order: The requested qty is not available</p></div> */}
	</div>;
}

export default Notifications;