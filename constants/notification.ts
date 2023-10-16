import { makeVar } from "@apollo/client";

const notification = makeVar({notificationType: '', message: ''});

export default notification;
