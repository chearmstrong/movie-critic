workflow "DEV: CI/CD" {
  on = "push"
  resolves = [
    "DEV: Test",
    "DEV: Lint",
    "DEV: Deploy",
  ]
}

action "DEV: Filter" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch develop"
}

action "DEV: Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "i"
  needs = ["DEV: Filter"]
}

action "DEV: Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "t"
  needs = ["DEV: Install"]
}

action "DEV: Lint" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "run lint"
  needs = ["DEV: Install"]
}

action "DEV: Deploy" {
  uses = "serverless/github-action@master"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  args = "deploy --stage dev"
  needs = [
    "DEV: Test",
    "DEV: Lint",
  ]
}

workflow "PROD: CI/CD" {
  on = "push"
  resolves = [
    "PROD: Test",
    "PROD: Lint",
    "PROD: Deploy",
  ]
}

action "PROD: Filter" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch master"
}

action "PROD: Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "i"
  needs = ["PROD: Filter"]
}

action "PROD: Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "t"
  needs = ["PROD: Install"]
}

action "PROD: Lint" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "run lint"
  needs = ["PROD: Install"]
}

action "PROD: Deploy" {
  uses = "serverless/github-action@master"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  args = "deploy --stage prod"
  needs = [
    "PROD: Test",
    "PROD: Lint",
  ]
}

workflow "PR: Tester" {
  resolves = [
    "PR: Test",
    "PR: Lint",
  ]
  on = "pull_request"
}

action "PR: Install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "i"
}

action "PR: Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "t"
  needs = ["PR: Install"]
}

action "PR: Lint" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["PR: Install"]
  args = "run lint"
}
