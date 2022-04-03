# !Review Command Generator

## Problem

In my team, we do code review on Gerrit and on Slack, we have set up a command specifically used to invite others to review our changesets. The command format is `!review <changeset-id> [changeset-id] [changeset-id] ...`. However, it is a bit time consuming to manually write the command ourselves.

## Solution

I have developed a Chrome extension to automatically generate the command and place it into our clipboard.

![The snapshot of !Review Command Generator][app-snapshot]

As shown in the above snapshot, the user will need to right click to open the context menu and click on 'Get !review command' to obtain the review command. The generated command will include the current changeset and the related changesets that are not yet merged.

## Installation

1. Go to chrome://extensions on Google Chrome.
1. ![Chrome-extensions page][ext-page]
1. Load this directory.


[app-snapshot]: <docs/app-snapshot.jpg>
[ext-page]: <docs/ext-page.jpg>

## Tested environment

1. Google Chrome Version 98.0.4758.109 (Official Build) (arm64)
