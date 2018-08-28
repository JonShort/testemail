# Testemail

[![NPM Version](https://badge.fury.io/js/testemail.svg)](https://npmjs.com/package/testemail)
[![gzipped size](https://img.shields.io/bundlephobia/minzip/testemail.svg)](https://npmjs.com/package/testemail)
[![NPM Downloads](https://img.shields.io/npm/dm/testemail.svg?style=flat)](https://npmjs.com/package/testemail)

[Usage example](/assets/usage.gif 'Usage example')

Zero-dependency CLI to generate a uniquely aliased email address for use in testing.

Can automatically use a provided email (using env variables), or accepts an email via. the CLI.

Email is clearly returned in the console, making it easily copied ready for pasting into the browser.

## Use Case

Your application requires a unique email address to be used when signing up, but allows email addresses to be aliased using the '+alias' syntax.

## Installation

This package should be installed globally, so that it can be easily executed via. CLI:

_With npm_

```bash
npm install -g testemail
```

_With Yarn_

```bash
yarn global add testemail
```

## Usage

In terminal / cmd:

```bash
testemail
```

This will either:

- Generate an aliased email instantly
- Allow you to enter an email address to be aliased
- Allow you to use the email address previously used

## Advanced usage / configuration

### Speeding up the process

Setting the optional `TEST_EMAIL_ADDRESS` environment variable allows the aliased email to be instantly generated using the provided email address.

### Last generated email file

As part of the email generation, a `JSON` file is stored by default at `~/.test-email.json`. This file is overwridden whenever an aliased email is generated, and is used to:

- Allow the CLI to know the previously used address (for "use same as previous?" question)
- Give the user info on when the previous generation happened and what email address.

An example of this file is:

```json
{
  "provided": "something@something.com",
  "generated": "something+1530907083050@something.com",
  "date": "Fri Jul 06 2018 20:58:03 GMT+0100 (BST)"
}
```

The location this file is stored can be configured with the optional `TEST_EMAIL_FILE` environment variable. This should be relative to root, e.g. `~/jon/Documents/email-file/my-test-email.json`.
