import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { getSession } from "@/lib/session";
import { serializeUser } from "@/lib/user-serialize";
import {
  normalizeEnrollments,
  syncEnrollmentFields,
} from "@/lib/enrollment-helpers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXT = new Set([
  ".pdf",
  ".zip",
  ".rar",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".doc",
  ".docx",
  ".txt",
  ".md",
]);

function isGithubUrl(url: string) {
  try {
    const u = new URL(url);
    return (
      (u.hostname === "github.com" || u.hostname === "www.github.com") &&
      u.pathname.split("/").filter(Boolean).length >= 2
    );
  } catch {
    return false;
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await request.formData();
    const taskId = String(form.get("taskId") || "").trim();
    const githubUrl = String(form.get("githubUrl") || "").trim();
    const submissionNote = String(form.get("submissionNote") || "").trim();
    const files = form
      .getAll("files")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (!taskId) {
      return NextResponse.json({ error: "Task id is required." }, { status: 400 });
    }

    if (!githubUrl || !isGithubUrl(githubUrl)) {
      return NextResponse.json(
        {
          error:
            "A valid GitHub repository link is required (e.g. https://github.com/user/repo).",
        },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.enrollments?.length) {
      const migrated = normalizeEnrollments(user);
      if (migrated.length) {
        user.enrollments = migrated;
        syncEnrollmentFields(user);
        user.markModified("enrollments");
        user.markModified("tasks");
        await user.save();
      }
    }

    const enrollments = user.enrollments || [];
    let currentFiles: Array<{ name: string; url: string; size: number }> = [];
    let foundStatus: string | null = null;

    for (const enrollment of enrollments) {
      const found = enrollment.tasks.find((t) => t.id === taskId);
      if (found) {
        foundStatus = found.status;
        currentFiles = Array.isArray(found.files) ? [...found.files] : [];
        break;
      }
    }

    if (!foundStatus && user.tasks?.length) {
      const found = user.tasks.find((t) => t.id === taskId);
      if (found) {
        foundStatus = found.status;
        currentFiles = Array.isArray(found.files) ? [...found.files] : [];
      }
    }

    if (!foundStatus) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (foundStatus === "approved") {
      return NextResponse.json({ error: "This task is already approved." }, { status: 400 });
    }

    const savedFiles: { name: string; url: string; size: number }[] = [];
    if (files.length) {
      const dir = path.join(
        process.cwd(),
        "public",
        "uploads",
        user._id.toString(),
        taskId.replace(/[:/\\]/g, "_"),
      );
      await mkdir(dir, { recursive: true });

      for (const file of files.slice(0, 5)) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `File "${file.name}" exceeds 5MB limit.` },
            { status: 400 },
          );
        }
        const ext = path.extname(file.name).toLowerCase();
        if (!ALLOWED_EXT.has(ext)) {
          return NextResponse.json(
            { error: `File type not allowed for "${file.name}".` },
            { status: 400 },
          );
        }
        const safe = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const buf = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(dir, safe), buf);
        savedFiles.push({
          name: file.name,
          url: `/uploads/${user._id.toString()}/${taskId.replace(/[:/\\]/g, "_")}/${safe}`,
          size: file.size,
        });
      }
    }

    const nextFiles = [...currentFiles, ...savedFiles];
    const submittedAt = new Date();

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          "enrollments.$[enr].tasks.$[task].status": "submitted",
          "enrollments.$[enr].tasks.$[task].githubUrl": githubUrl,
          "enrollments.$[enr].tasks.$[task].submissionNote": submissionNote,
          "enrollments.$[enr].tasks.$[task].files": nextFiles,
          "enrollments.$[enr].tasks.$[task].submittedAt": submittedAt,
          "tasks.$[task].status": "submitted",
          "tasks.$[task].githubUrl": githubUrl,
          "tasks.$[task].submissionNote": submissionNote,
          "tasks.$[task].files": nextFiles,
          "tasks.$[task].submittedAt": submittedAt,
        },
      },
      {
        arrayFilters: [
          { "enr.tasks.id": taskId },
          { "task.id": taskId },
        ],
      },
    );

    const fresh = await User.findById(user._id);
    if (!fresh) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: serializeUser(fresh) });
  } catch (error) {
    console.error("task update error", error);
    return NextResponse.json({ error: "Could not update task." }, { status: 500 });
  }
}
