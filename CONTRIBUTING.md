# CONTRIBUTING

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to this project, which are hosted on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [Oliver Paraskos](https://keybase.io/oparaskos).

## I don't want to read this whole thing I just have a question!!!

Please check to see if what you're looking for is in the README file, or use the GitHub Discussions tab if you have questions.

* [Discussions](https://github.com/oparaskos/ethicalchoices/discussions)
* [README](https://github.com/oparaskos/ethicalchoices/blob/main/README.md)

For more pressing questions you can message [Oliver Paraskos](https://keybase.io/oparaskos) via Keybase.

## What should I know before I get started?

### Design Decisions

At present any suggestions or comments relating to the design, both visual and architectural are welcome in the [Discussions Tab](https://github.com/oparaskos/ethicalchoices/discussions).

No hard rules or guidelines are yet present.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a [Bug Report](https://github.com/oparaskos/ethicalchoices/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D%20Example%20Title).

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one.
When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report).
Fill out [the required template](https://github.com/oparaskos/ethicalchoices/blob/master/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps to resolve issues more quickly.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Check that the problem exists in the latest version of the code**
* **Perform a [cursory search](https://github.com/oparaskos/ethicalchoices/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue in the repository and provide the following information by filling in [the template](https://github.com/oparaskos/ethicalchoices/blob/master/.github/ISSUE_TEMPLATE/bug_report.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started Atom, e.g. which command exactly you used in the terminal, or how you started Atom otherwise. When listing steps, **don't just say what you did, but explain how you did it**.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps, **record the GIF with the [Keybinding Resolver](https://github.com/atom/keybinding-resolver) shown**. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Is the issue present only running locally, or only online?** You can get the exact version by running `atom -v` in your terminal, or by starting Atom and running the `Application: About` command from the [Command Palette](https://github.com/atom/command-palette).
* **What's the name and version of the OS you're using**?
* Are you using docker with Hyper-V or VirtualBox?
* **Are you running in a virtual machine?** If so, which VM software are you using and which operating systems and versions are used for the host and the guest?
* **Are you using [local configuration files](https://create-react-app.dev/docs/adding-custom-environment-variables/)** `.env.local`, etc? If so, provide the contents of those files (with any secrets redacted), preferably in a [code block](https://help.github.com/articles/markdown-basics/#multiple-lines) or with a link to a [gist](https://gist.github.com/).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/oparaskos/ethicalchoices/blob/master/.github/ISSUE_TEMPLATE/feature_request.md), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

* **Perform a [cursory search](https://github.com/oparaskos/ethicalchoices/labels/enhancement)** to see if the enhancement has already been suggested. If it has, add a comment to, and :+1: the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined [which repository](#atom-and-packages) your enhancement suggestion is related to, create an issue on that repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of the product which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most users.


### Your First Code Contribution

Unsure where to begin contributing? You can start by looking at the Issue label [Good First Issue][https://github.com/oparaskos/ethicalchoices/labels/good%20first%20issue], these are issues which should only require a few lines of code, and a test or two.

If you need help, or don't quite understand the issue don't hesitate to leave a comment on it.

#### Local development

This project can be developed locally. For instructions on how to do this, see the README.md file

### Pull Requests

The process described here has several goals:

- Maintain quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for product's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* _Preferably_ Use the present tense ("Add feature" not "Added feature")
* _Preferably_ Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* _Preferably_ Limit the first line to 72 characters or less
* _Reference issues and pull requests_ liberally after the first line (`:memo: #1 Completed Example Ticket`)
* _Consider_ starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

