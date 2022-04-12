# !Review Command Generator

## Problem

In my team, we do code review on Gerrit and on Slack, we have set up a command specifically used to invite others to review our changesets. The command format is `!review <changeset-id> [changeset-id] [changeset-id] ...`. However, it is a bit time consuming to manually write the command ourselves.

## Solution

I have developed a Chrome extension to automatically generate the command and place it into our clipboard.

![The snapshot of !Review Command Generator][app-snapshot]

1. Go to the Gerrit web page as shown in the above snapshot
1. Right click to open the context menu
1. Click on 'Get the !review command'

Then, the generated !review command will be placed into your clipboard.

## Installation

1. Go to chrome://extensions on Google Chrome.
1. ![Chrome-extensions page][ext-page]
1. Load this directory.


## Troubleshooting

### In case the 'Get the !review command' button is disabled when it is supposed to be enabled

1. Move your mouse cursor.
1. If the above method does not work, hard reload your web page.
1. If the above method does not work, remove Google Chrome completely from your RAM and swap memory.

### In case this extension does not work as expected after you update / reload it

1. Hard reload your web pages.
1. If the above method does not work, remove Google Chrome completely from your RAM and swap memory.

### In case this extension results in below error message after you update / reload it

![Uncaught Error: Extension context invalidated.][invalid-ext-ctx]

Ignore it. This error message appears because the content scripts of this extension running on the existing web pages are not yet reloaded. A hard reload of your web pages will reload them.

## Tested environment

1. Google Chrome Version 98.0.4758.109 (Official Build) (arm64)

[app-snapshot]: <docs/app-snapshot.jpg>
[ext-page]: <docs/ext-page.jpg>
[invalid-ext-ctx]: <docs/invalid-ext-ctx.jpg>

