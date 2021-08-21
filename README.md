
<h1 align="center">🌍 Ethical Choices 🌲</h1>

<p align="center">Democratising the market by empowering informed purchase choices without burdensome research.</p>

## 🔗 Links

- [📚 Code Repository](https://github.com/oparaskos/ethicalchoices "Ethical Choices Repo")
- [🐞 Bugs, Issues and Tasks](https://github.com/oparaskos/ethicalchoices/issues "Issues Page")
- [🦕 Live Site (🔨 TODO)](https://ethicalchoices.xyz "Live View")
- [🧫 API (🔨 TODO)](https://ethicalchoices.xyz/api "API")

## 📷 Screenshots

None

## 🔧 Built With

- [TypeScript](https://www.typescriptlang.org/) / [React](https://reactjs.org/)
- [Terraform](https://www.terraform.io/intro/index.html)
- [Docker](https://docs.docker.com/get-started/08_using_compose/)
- [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html)
- [Nginx](https://hub.docker.com/_/nginx/)

## 🏭 Running Locally

1. Start Docker
1. Start Elasticsearch & Nginx (`docker compose up`)
1. Start The Web Crawler (`cd crawler/ && npm ci && npm start`) Leave this running for some time.
1. Start The Website (`cd site/ && npm ci && npm start`)

## 🧔 Author

**Oliver Paraskos**

- [Profile](https://github.com/oparaskos "Oliver Paraskos")
- [Email](mailto:oparaskos@gmail.com?subject=Hi "Hi!")
- [Website](https://oliver.paraskos.me.uk "Welcome")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ or 👁‍🗨 if you like this project!

## Reporting issues and Vulnerabilities

For things which are not security vulnerabilities please raise an issue with the correct corresponding label

- [🐞 Raise a Bug](https://github.com/oparaskos/ethicalchoices/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D%20Example%20Title)
- [🙏 Request a Feature](https://github.com/oparaskos/ethicalchoices/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D%20Example%20Title)
- [❓ Ask a Question](https://github.com/oparaskos/ethicalchoices/issues/new?assignees=&labels=https://github.com/oparaskos/ethicalchoices/issues/new?labels=question,documentation&title=%5BQUERY%5D%20Example%20Title)

If the vulnerability has any impact on user-data or is high severity please [raise a security advisory on GitHub](https://github.com/oparaskos/ethicalchoices/security/advisories/new).

If the issue has low or medium severity and has no impact on user-data please [raise an issue instead](https://github.com/oparaskos/ethicalchoices/issues/new?assignees=&labels=bug,security&template=bug_report.md&title=%5BSECURITY%5D%20Vulnerability).


## 🆘 Troubleshooting:

### docker-compose up on windows vm.max_map_count

Before running docker commands execute the following.

```powershell
    # Open Powershell
    PS C:\> wsl -d docker-desktop sysctl -w vm.max_map_count=262144
```