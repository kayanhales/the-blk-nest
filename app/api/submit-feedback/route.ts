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

    const { type, subject, message, name } = submission;

    if (!type || !subject || !message) {
      throw new Error("Missing required feedback fields");
    }

    const issueBody = `
**Feedback Type:** ${type}

**Message:**
${message}

${name ? `**Submitted by:** ${name}` : ""}
    `.trim();

    const issue = await octokit.rest.issues.create({
      owner: OWNER,
      repo: REPO,
      title: `[Feedback] ${subject}`,
      body: issueBody,
      labels: ["feedback", type],
    });

    return NextResponse.json({
      message: "Feedback submitted successfully",
      issueUrl: issue.data.html_url,
    });
  } catch (err: any) {
    console.error("Error creating issue:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
