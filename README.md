# puremodels - [AngularJS](http://angularjs.org/) common model utilities

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/puremodels?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

***

## IMPT - 2015 PLANS

As of 17 Jan 2015 The milestones are as follows:

* The **0.0.2** milestone will be for bug fixes and more tests
* The **0.0.3** milestone will contain more functionality for tree and calendar


## Demo

Do you want to see model in action? Visit http://localhost:3000

## Installation

Installation is easy as puremodels has minimal dependencies - only the AngularJS and Bootstrap's CSS are required.

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `ng-puremodels` AngularJS module:

```javascript
angular.module('myModule', ['ng-puremodels']);
```

Project files are also available through your favourite package manager:
* **Bower**: `bower install ng-puremodels`

## Support

Project's issue on GitHub should be used discuss bugs and features.

## FAQ

https://github.com/puremodels/wiki/FAQ

## Supported browsers

Directives from this repository are automatically tested with the following browsers:
* Chrome (stable and canary channel)
* Firefox
* IE 9 and 10
* Opera
* Safari

Modern mobile browsers should work without problems.

**IE 8 is not supported**.

We are  NOT  testing against IE8.

## Project philosophy

### Native, lightweight models

We are aiming at providing a set of AngularJS directives based on Bootstrap's markup and CSS. The goal is to provide **native AngularJS directives** without any dependency on jQuery or Bootstrap's JavaScript.
It is often better to rewrite an existing JavaScript code and create a new, pure AngularJS directive. Most of the time the resulting directive is smaller as compared to the original JavaScript code size and better integrated into the AngularJS ecosystem.

Good luck with puremodels!