export interface User {
    id: string;
    name: string;
    email: string;
    emailConfirmed: boolean;
    mobile: string;
    mobileConfirmed: boolean;
    pushoverKey: string;
    slackWebhookUrl: string;
    slackChannel: string;
    role: string;
    notifications: {
        outages: boolean;
        outageReminders: boolean;
    };
}
