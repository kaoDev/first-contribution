<h3 align="center">Greet first contributors</h3>
<p align="center">A GitHub Action that greets first contributors.<p>

## Usage

This GitHub Action adds a comment with a welcome
message to PRs coming from first contributors to
your project.

```workflow
workflow "Welcome" {
  on = "pull_request"
  resolves = ["Greet"]
}

action "Greet" {
  uses = "kaoDev/first-contribution@master"
  secrets = ["GITHUB_TOKEN"]
}
```
