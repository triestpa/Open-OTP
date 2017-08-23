# Open-OTP

### Description
An open-sourced, web-based, offline-first, time-based one-time-password generator.
The app generates a new 6-digit OTP every 30 seconds, based on the shared secret value.
The secret is also encoded bellow as a QR code. Try scanning it with Google Authenticator to verify that the generated OTPs are in sync.

## Status
This is the not-yet-designed POC version.  The todo list is, frankly, too long to list here.

## Dependencies
- [VueJS](https://vuejs.org/) as a view controller.
- [MUI](https://www.muicss.com/) for material design styling.
- [Qrious](https://neocotic.com/qrious/) for QR code generation.
- [JSEncrypt](https://github.com/brix/crypto-js) for encrypted local storage of the OTP secrets.

This is the companion app to the Tiny-OTP library, which can be used to generate RFC 4226 compliant HMAC-based one-time passwords (HOTPs) and RFC 6238 compliant time-based one-time passwords (TOTPs) in any Javascript project - https://github.com/triestpa/Tiny-OTP