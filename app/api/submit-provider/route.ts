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

// Map provider types to their JSON file paths
const PROVIDER_FILE_MAP: Record<string, string> = {
  doula: "data/providers/doulas.json",
  pediatrician: "data/providers/pediatricians.json",
  "pelvic-floor-therapist": "data/providers/pelvic-floor-therapists.json",
};

export async function POST(req: NextRequest) {
  try {
    const submission = await req.json();

    if (!submission.providerType || !PROVIDER_FILE_MAP[submission.providerType]) {
      throw new Error("Invalid or missing provider type");
    }

    const FILE_PATH = PROVIDER_FILE_MAP[submission.providerType];

    // 1️⃣ Get default branch
    const { data: repoData } = await octokit.repos.get({ owner: OWNER, repo: REPO });
    const defaultBranch = repoData.default_branch;

    // 2️⃣ Create a new branch for this submission
    const branchName = `submission-${submission.providerType}-${Date.now()}`;
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

    // 3️⃣ Get existing JSON file
    const { data: fileData } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      ref: defaultBranch,
    });

    // Type guard to ensure we have a file
    if (!("content" in fileData)) {
      throw new Error("Expected a single file, but got a directory, symlink, or submodule.");
    }

    const existingContent = fileData.content;
    const fileSha = fileData.sha;

    // Decode existing content and append new submission
    const currentData = JSON.parse(Buffer.from(existingContent, "base64").toString("utf-8"));
    currentData.push(submission);

    const updatedContent = Buffer.from(JSON.stringify(currentData, null, 2)).toString("base64");

    // 4️⃣ Update the file on the new branch
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `Add new ${submission.providerType}: ${submission.name || "Untitled"}`,
      content: updatedContent,
      branch: branchName,
      sha: fileSha,
    });

    // 5️⃣ Open a Pull Request
    const pr = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      title: `New ${submission.providerType} Submission: ${submission.name || "Untitled"}`,
      head: branchName,
      base: defaultBranch,
      body: `${JSON.stringify(submission, null, 2)}`,
    });

    return NextResponse.json({ message: "PR created successfully", prUrl: pr.data.html_url });
  } catch (err: any) {
    console.error("Error creating PR:", err);
    return NextResponse.json({ error: err.message || "Failed to create PR" }, { status: 500 });
  }
}
