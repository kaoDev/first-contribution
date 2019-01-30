import { Toolkit } from "actions-toolkit";

const tools = new Toolkit();
const octokit = tools.github;

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

  if (
    !contributors.data.some(
      contributor =>
        contributor.login === authorLogin
    )
  ) {
    const commentBody = `
🥳 🎉 🎊

This is your first Pull request on this project. Thanks a lot and a warm welcome to you.
`;

    const params = tools.context.repo({
      number: prNumber,
      body: commentBody
    });
    octokit.issues.createComment(params);
  }
}
