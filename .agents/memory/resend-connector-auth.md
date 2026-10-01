---
name: Resend connector authentication
description: Resend connections use provider-managed API keys and can fail independently of application routing.
---

The Resend connector is an API-key integration rather than an OAuth integration. A reachable connector can still return a provider authentication error when its configured key is invalid; this must be repaired in the Replit connection rather than implemented as an application-side secret.

**Why:** The connector proxy and application request path can be healthy while Resend rejects the stored provider credential.

**How to apply:** When Resend returns an authentication failure, inspect the connection context, avoid OAuth reauthorization, and have the owner replace or repair the provider key through the Replit integration settings.