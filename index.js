const { Toolkit } = require("actions-toolkit");

const tools = new Toolkit();
const octokit = tools.github;

const pkg = tools.getPackageJSON();

console.log(
  "context of this action: ",
  tools.context
);

if (tools.context.action === "opened") {
  const { pull_request } = tools.context.payload;

  if (pull_request) {
    const author = pull_request["user"];

    commentOnFirstContribution(
      author.login,
      pull_request.number
    );
  }
}

async function commentOnFirstContribution(
  authorLogin,
  prNumber
) {
  const contributors = await octokit.repos.listContributors(
    tools.context.repo()
  );

  console.log(
    "search ",
    authorLogin,
    " in ",
    contributors.data
  );
  if (
    !contributors.data.some(
      contributor =>
        contributor.login === authorLogin
    )
  ) {
    const commentBody = `
🥳 🎉 🎊

Yay! Welcome to the ${pkg.name} project.
`;

    const params = tools.context.repo({
      number: prNumber,
      body: commentBody
    });
    octokit.issues.createComment(params);
  }
}
