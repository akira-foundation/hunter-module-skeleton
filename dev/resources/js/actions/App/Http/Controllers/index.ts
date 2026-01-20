import SessionController from './SessionController'
import UserController from './UserController'
import UserPasswordController from './UserPasswordController'
import UserEmailResetNotification from './UserEmailResetNotification'
import UserProfileController from './UserProfileController'
import UserTwoFactorAuthenticationController from './UserTwoFactorAuthenticationController'
import UserEmailVerificationNotificationController from './UserEmailVerificationNotificationController'
import UserEmailVerification from './UserEmailVerification'

const Controllers = {
    SessionController: Object.assign(SessionController, SessionController),
    UserController: Object.assign(UserController, UserController),
    UserPasswordController: Object.assign(UserPasswordController, UserPasswordController),
    UserEmailResetNotification: Object.assign(UserEmailResetNotification, UserEmailResetNotification),
    UserProfileController: Object.assign(UserProfileController, UserProfileController),
    UserTwoFactorAuthenticationController: Object.assign(UserTwoFactorAuthenticationController, UserTwoFactorAuthenticationController),
    UserEmailVerificationNotificationController: Object.assign(UserEmailVerificationNotificationController, UserEmailVerificationNotificationController),
    UserEmailVerification: Object.assign(UserEmailVerification, UserEmailVerification),
}

export default Controllers