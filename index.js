// @ts-check
const { Toolkit } = require("actions-toolkit");

const tools = new Toolkit();
const octokit = tools.github;

const pkg = tools.getPackageJSON();

console.log(
  "context of this action: ",
  tools.context
);

async function commentOnFirstContribution() {
  const { pull_request } = tools.context.payload;

  if (pull_request) {
    const author = pull_request["user"];

    const {
      data: contributors
    } = await octokit.repos.listContributors(
      tools.context.repo()
    );

    const isAlreadyContributor = contributors.some(
      contributor =>
        contributor.login === author.login
    );

    console.log(
      "search ",
      author.login,
      " in ",
      contributors,
      " isAlreadyContributor ",
      isAlreadyContributor
    );

    if (
      tools.context.payload.action === "opened" &&
      !isAlreadyContributor
    ) {
      const commentBody = `
🥳 🎉 🎊

Yay! Welcome to the ${
        // @ts-ignore
        pkg.name
      } project.
`;
      const params = tools.context.repo({
        number: pull_request.number,
        body: commentBody
      });
      octokit.issues.createComment(params);
    }
  }
}

commentOnFirstContribution();
