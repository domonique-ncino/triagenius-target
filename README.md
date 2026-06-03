# TriaGenius Target

Demo application with intentional bugs. Used as the target repository for [TriaGenius](https://github.com/ncino/aws-june-skillday-dixon) to demonstrate AI-powered auto-remediation.

## Intentional Bugs

| Service | Bug | Error |
|---------|-----|-------|
| payment-service | Missing null check on `accountId` | `TypeError: Cannot read properties of null` |
| auth-service | Timeout too low (3s) for auth calls | `TimeoutError: Connection timed out after 3000ms` |
| notification-service | Uncaught promise rejection in email send | `UnhandledPromiseRejection` |
| inventory-service | SQL injection vector in search query | `DatabaseError: syntax error` |
| user-service | Missing error handling on JSON parse | `SyntaxError: Unexpected token` |

These bugs are left in place intentionally. TriaGenius will detect them from error logs and open PRs with fixes.
