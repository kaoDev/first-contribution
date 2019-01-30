workflow "Welcome" {
  on = "pull_request"
  resolves = ["Greet"]
}

action "Greet" {
  uses = "kaoDev/first-contribution@master"
  secrets = ["GITHUB_TOKEN"]
}
