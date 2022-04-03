# Is Windows on ARM Ready?

This project tracks whether popular applications and development platforms natively support Windows on ARM64.

## Inclusion Criteria

In order to be included in the listings, an application must (1) be something that a large portion of the Windows userbase has heard of and (2) have a version for Windows. For development platforms, it should be something most Windows developers have heard of. In the case of a framework built upon an existing language/platform, it is only eligible for inclusion once the language/platform has native support for ARM64. (So, for example, until .NET supports ARM64, ASP.NET Core can't be listed.)

## Acceptance Criteria

In order to be marked as having an ARM version, an application must (1) have an ARM64 version (2) that is officially supported, (3) available via the same channel as the x86 version, and (4) does not require any additional steps to get the ARM64 version versus the x86 version. Forks, nightly builds, and hidden downloads do not qualify.

Exceptions to the above criteria will be made if (5) the default x86 installer actually installs the ARM64 version, or (6) the ARM64 version is easily accessible from the primary download page.

## Entry Format

All entries are JSON files stored in `content` with the following format:

```json
{
  "name": "<name of application>",
  "category": "<one of 'microsoft', 'applications', or 'development'>",
  "armVersion": false, // or true
  "link": "<url to product page>"
}
```

## Attributions

This site is built using [Zola](https://www.getzola.org/). The favicon is from the [Twemoji](https://twemoji.twitter.com/) emoji set.
