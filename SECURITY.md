# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Do not** report security vulnerabilities through public GitHub issues.

Instead, please send an email to the maintainers with:

1. A description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact assessment
4. Any suggested fixes (if applicable)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Assessment**: We will investigate and assess the vulnerability
- **Updates**: We will keep you informed of our progress
- **Resolution**: We aim to resolve critical vulnerabilities within 7 days
- **Credit**: With your permission, we will credit you in the security advisory

### Scope

This security policy covers:

- The hunter-module-skeleton repository
- Any modules created from this skeleton (for skeleton-related issues)

### Out of Scope

- Vulnerabilities in dependencies (report these to the respective projects)
- Issues that require physical access to a user's device
- Social engineering attacks

## Security Best Practices

When developing Hunter modules:

1. **Validate all input** - Use Laravel's validation features
2. **Sanitize output** - Escape data in views to prevent XSS
3. **Use parameterized queries** - Eloquent handles this automatically
4. **Implement proper authorization** - Use policies and gates
5. **Keep dependencies updated** - Run `composer update` regularly
6. **Use HTTPS** - Ensure all production deployments use HTTPS
7. **Protect sensitive data** - Never commit secrets to version control

## Security Updates

Security updates will be released as patch versions. We recommend:

- Enabling Dependabot or similar tools
- Subscribing to security advisories
- Keeping your modules updated
