import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const GITHUB_PAT = process.env.GITHUB_PAT;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const REPO_NAME = process.env.REPO_NAME;

if (!GITHUB_PAT || !GITHUB_USERNAME || !REPO_NAME) {
  throw new Error("Missing GitHub environment variables");
}

const octokit = new Octokit({ auth: GITHUB_PAT });
const OWNER = GITHUB_USERNAME;
const REPO = REPO_NAME;

export async function POST(req: NextRequest) {
  try {
    const submission = await req.json();

    // 1️⃣ Get the default branch
    const { data: repoData } = await octokit.repos.get({
      owner: OWNER,
      repo: REPO,
    });
    const defaultBranch = repoData.default_branch;

    // 2️⃣ Create a new branch for this submission
    const branchName = `submission-${Date.now()}`;
    const { data: refData } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${defaultBranch}`,
    });

    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${branchName}`,
      sha: refData.object.sha,
    });

    // 3️⃣ Add the new resource as a JSON file
    const fileName = `submissions/${branchName}.json`;
    const content = Buffer.from(JSON.stringify(submission, null, 2)).toString("base64");

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: fileName,
      message: `Add new resource submission: ${submission.title || "Untitled"}`,
      content,
      branch: branchName,
    });

    // 4️⃣ Open a Pull Request
    const pr = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      title: `New Resource Submission: ${submission.title || "Untitled"}`,
      head: branchName,
      base: defaultBranch,
      body: `A new resource was submitted:\n\n${JSON.stringify(submission, null, 2)}`,
    });

    return NextResponse.json({ message: "PR created successfully", prUrl: pr.data.html_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create PR" }, { status: 500 });
  }
}
